// Models
const Editor = require("../models/Editor");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const Razorpay = require("../models/Razorpay");
const { v4: uuid } = require("uuid");

// NPM Packages
const [{ sign }, { hash, compare }] = [
  require("jsonwebtoken"),
  require("bcryptjs")
];

// Utils
const {
  forgotPasswordMailing,
  completedOrderMailing
} = require("../utils/nodeMailer");
const instance = require("../utils/razorpay");
const createSignature = require("../utils/createSignature");

module.exports = {
  async editorRazorpayOrderCreate(req, res) {
    try {
      const { email, amountInPaise, currency } = req.body;
      const user = await Editor.findOne({ email });
      if (!user)
        return res.status(404).json({ error: { message: "No user found" } });
      if (user.status === "active")
        return res
          .status(409)
          .json({ error: { message: "user account already activated" } });
      const transactionId = uuid();
      const razorpayOrderOptions = {
        currency,
        amount: amountInPaise,
        receipt: transactionId,
        payment_capture: 0
      };
      const razorpayOrder = await instance.orders.create(razorpayOrderOptions);
      console.log(razorpayOrder);
      const razorpay = await new Razorpay({
        email,
        orderValue: `${amountInPaise / 100} ${currency}`,
        razorpayOrderId: razorpayOrder.id,
        razorpayPaymentId: null,
        razorpaySignature: null,
        isPending: true
      });
      razorpay.save();
      console.log(razorpay);
      res.status(201).json({
        data: {
          orderId: razorpayOrder.id,
          email: email,
          amount: `${amountInPaise / 100} ${currency}`
        }
      });
    } catch (error) {
      return res.json({ error: { message: error.message } });
    }
  },
  async editorRazorpayOrderVerify(req, res) {
    try {
      const {
        amount,
        currency,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      } = req.body;
      const createdSignature = createSignature(
        razorpay_order_id,
        razorpay_payment_id
      );
      if (createdSignature !== razorpay_signature) {
        return res
          .status(401)
          .json({ error: { message: "Invalid payment request" } });
      }
      const captureResponse = await instance.payments.capture(
        razorpay_payment_id,
        amount,
        currency
      );
      console.log(captureResponse);
      // Success area comes in
      const razorpay = await Razorpay.findOne({
        razorpayOrderId: razorpay_order_id
      });
      if (!razorpay) {
        return res
          .status(401)
          .json({ error: { message: "Invalid payment request" } });
      }
      razorpay.razorpayPaymentId = razorpay_payment_id;
      razorpay.razorpaySignature = razorpay_signature;
      razorpay.isPending = false;
      razorpay.save();

      const user = await Editor.findOne({ email: razorpay.email });
      if (!user)
        return res.status(404).json({ error: { message: "No user found" } });
      user.status = "active";
      user.save();
      res
        .status(201)
        .json({ success: { message: "Account activated successfully" } });
    } catch (error) {
      return res.json({ error: { message: error.message } });
    }
  },

  async editorRegister(req, res) {
    try {
      var { name, email, password, officeName, mobile, address } = req.body;
      const emailCheck = await Editor.findOne({ email });
      if (emailCheck)
        return res.status(409).json({ error: { message: "Duplicate Email" } });
      const editor = await new Editor({
        name,
        email,
        password,
        officeName,
        mobile,
        address
      });
      const hashedPassword = await hash(password, 10);
      editor.password = hashedPassword;
      editor.save();
      res.status(201).json({
        success: {
          message: `Account created successfully, Make payment to activate the account`
        }
      });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async editorLogin(req, res) {
    try {
      var email = req.body.email;
      var password = req.body.password;
      if (!email || !password)
        return res
          .status(400)
          .json({ error: { message: "Incorrect credentials" } });
      const editor = await Editor.findOne({ email });
      if (!editor)
        return res
          .status(401)
          .json({ error: { message: "Email not registered" } });
      const isMatched = await compare(password, editor.password);
      if (!isMatched)
        return res.status(401).send({
          error: { message: "Incorrect credentials" }
        });
      if (editor.status === "requested")
        return res.status(401).json({
          error: {
            message:
              "Complete the account activation process to activate your account"
          }
        });
      if (editor.status === "blocked")
        return res.status(403).json({
          error:
            "Your account has been blocked due to misuse of web application, Please contact Admin for more information"
        });
      const token = await sign(
        { _id: editor._id },
        process.env.JSON_WEB_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      editor.jsonWebToken = token;
      editor.save();

      return res.status(200).json({
        data: {
          jsonWebToken: token,
          name: editor.name
        }
      });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },
  async editorProfile(req, res) {
    try {
      const user = await Editor.findById(req.editor._id);
      return res.status(200).json({
        data: {
          user
        }
      });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async editorCount(req, res) {
    try {
      const customersCount = await Customer.find({
        editors: req.editor._id
      }).countDocuments();
      const totalOrdersCount = await Order.find({
        editorId: req.editor._id
      }).countDocuments();
      const notStartedCount = await Order.find({
        editorId: req.editor._id,
        status: `not_started`
      }).countDocuments();
      const startedCount = await Order.find({
        editorId: req.editor._id,
        status: `started`
      }).countDocuments();
      const completedCount = await Order.find({
        editorId: req.editor._id,
        status: `completed`,
        isPaymentCompleted: `no`
      }).countDocuments();
      const cancelledCount = await Order.find({
        editorId: req.editor._id,
        status: `cancelled`
      }).countDocuments();
      return res.status(200).json({
        data: {
          customersCount,
          totalOrdersCount,
          notStartedCount,
          startedCount,
          completedCount,
          cancelledCount
        }
      });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async editorForgotPasswordOtp(req, res) {
    try {
      const email = req.body.email;
      const mobile = req.body.mobile;
      if (!email || !mobile)
        return res
          .status(400)
          .json({ error: { message: "enter email and mobile number" } });
      const editor = await Editor.findOne({ email, mobile, status: "active" });
      if (!editor)
        return res
          .status(401)
          .json({ error: { message: "Incorrect Credentials " } });
      if (editor.blockTime < new Date().getTime()) {
        editor.blockTime = null;
        editor.isTempBlocked = false;
        editor.otpAttempts = 0;
      }
      if (editor.isTempBlocked)
        return res.status(403).json({
          error: {
            message: "Your otps has been temporarily blocked for one day"
          }
        });
      const otp = Math.floor(Math.random() * 10000).toString();
      editor.otp = otp;
      editor.save();
      forgotPasswordMailing(email, otp);
      return res.status(201).json({
        success: {
          message:
            "OTP has been sent to your email successfully. Use that OTP to reset password"
        }
      });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async editorForgotPasswordReset(req, res) {
    try {
      const otp = req.body.otp;
      const newPassword = req.body.newPassword;
      const email = req.body.email;
      if (!otp || !newPassword || !email)
        return res
          .status(400)
          .json({ error: { message: "enter otp,email and new password" } });
      const editor = await Editor.findOne({ email, status: "active" });
      if (!editor)
        return res.status(401).json({ error: { message: "No user found " } });
      if (editor.otpAttempts >= 3) {
        return res.status(403).json({
          error: {
            message: "Your otps has been temporarily blocked for one day"
          }
        });
      }
      if (editor.otp !== otp) {
        editor.otpAttempts = editor.otpAttempts + 1;

        const attempts = 3 - editor.otpAttempts;
        if (attempts === 0) {
          editor.isTempBlocked = true;
          editor.otp = "";
          var blockTime = new Date().setHours(new Date().getHours() + 24);
          editor.blockTime = blockTime;
          editor.save();
          return res.status(403).json({
            error: {
              message: "Your otps has been temporarily blocked for one day"
            }
          });
        }
        editor.save();
        return res.status(403).json({
          error: {
            message: `Incorrect OTP, You have ${attempts} more attempts for otp validation`
          }
        });
      }
      const password = await hash(newPassword, 10);
      editor.password = password;
      editor.save();
      return res.status(201).json({
        success: {
          message: "Password has been successfully reset."
        }
      });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },
  async editorChangePassword(req, res) {
    try {
      const currentPassword = req.body.currentPassword;
      const newPassword = req.body.newPassword;
      const isVerified = await compare(currentPassword, req.editor.password);
      if (!isVerified)
        return res
          .status(400)
          .json({ error: { message: "current password is wrong" } });
      const hashedPassword = await hash(newPassword, 10);
      await Editor.findOneAndUpdate(
        { _id: req.editor._id },
        { password: hashedPassword }
      );
      return res
        .status(201)
        .json({ success: { message: "Editor password changed successfully" } });
    } catch (error) {
      return res.status(500).send({ error: { messsage: error.message } });
    }
  },
  async editorLogout(req, res) {
    try {
      await Editor.findOneAndUpdate(
        { _id: req.editor._id },
        { jasonWebToken: null }
      );
      return res.json({
        success: { message: "editor successfully logged out" }
      });
    } catch (error) {
      res.status(500).json({ error: { message: error.message } });
    }
  },

  async editorCreateCustomerAccount(req, res) {
    try {
      var { name, email, password, officeName, mobile, address } = req.body;
      const customer = await Customer.findOne({ email });
      if (customer) {
        if (customer.editors.includes(req.editor._id)) {
          return res.status(409).json({ error: "Duplicate Email" });
        }
        customer.editors.push(req.editor._id);
        customer.save();
        var editor = await Editor.findOne({ _id: req.editor._id });
        editor.customers.push(customer._id);
        editor.save();
        return res.status(201).json({
          success: {
            message:
              "Customer account already existed in the database, now it is linked to your account"
          }
        });
      }
      const newCustomer = await new Customer({
        name,
        email,
        password,
        officeName,
        mobile,
        address
      });
      newCustomer.editors.push(req.editor._id);
      const hashedPassword = await hash(password, 10);
      newCustomer.password = hashedPassword;
      newCustomer.save();
      var editor = await Editor.findOne({ _id: req.editor._id });
      editor.customers.push(newCustomer._id);
      editor.save();
      res.status(201).json({
        success: { message: `customer account created successfully` }
      });
    } catch (error) {
      return res.status(500).json({ error: { message: `${error.message}` } });
    }
  },
  async editorCreateOrder(req, res) {
    try {
      var {
        customerId,
        titleOfOrder,
        typeOfOrder,
        outPutFormat,
        estimatedDateOfCompletion,
        allotedEmployee,
        description,
        totalAmountInINR,
        advanceAmountInINR,
        isPaymentCompleted
      } = req.body;
      totalAmountInINR = Number(totalAmountInINR);
      advanceAmountInINR = Number(advanceAmountInINR);
      await new Order({
        customerId,
        editorId: req.editor._id,
        titleOfOrder,
        typeOfOrder,
        description,
        outPutFormat,
        estimatedDateOfCompletion,
        allotedEmployee,
        totalAmountInINR,
        advanceAmountInINR,
        isPaymentCompleted: Boolean(isPaymentCompleted)
      }).save();
      return res
        .status(201)
        .json({ success: { message: "order created successfully" } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },
  async editorViewAllOrders(req, res) {
    try {
      const orders = await Order.find({ editorId: req.editor._id });
      return res.status(200).json({ data: { orders } });
    } catch (error) {
      return res.status(500).send({ error: { messsage: error.message } });
    }
  },
  async editorUpdateOrder(req, res) {
    try {
      const orderId = req.params.orderId;
      var status = req.body.status;
      var isPaymentCompleted = req.body.isPaymentCompleted;
      const order = await Order.findOne({
        _id: orderId,
        editorId: req.editor._id
      });
      if (!order)
        return res.status(404).json({ error: { message: "Order not found" } });
      order.status = status;
      order.isPaymentCompleted = isPaymentCompleted;
      order.save();
      if (order.status === "completed") {
        const user = await Customer.findById(order.editorId);
        completedOrderMailing(order.titleOfOrder, user.email);
      }
      return res
        .status(201)
        .json({ success: { message: "order updated successfully" } });
    } catch (error) {
      return res.status(500).send({ error: { messsage: error.message } });
    }
  },

  async editorCustomerOfficeNames(req, res) {
    try {
      const customers = await Customer.find(
        { editors: req.editor._id },
        { _id: 1, name: 1, officeName: 1 }
      ).sort({ officeName: 1 });
      const count = customers.length;
      return res.status(200).json({ data: { customers, count } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async editorFilterOrders(req, res) {
    try {
      if (req.query.status === "completed") {
        const orders = await Order.find({
          status: req.query.status,
          isPaymentCompleted: false,
          editorId: req.editor._id
        })
          .populate("customerId", ["name", "officeName"])
          .sort({ createdAt: -1 });
        const count = orders.length;
        return res.status(200).json({ data: { orders, count } });
      } else {
        const orders = await Order.find(
          { status: req.query.status, editorId: req.editor._id },
          { __v: 0 }
        )
          .populate("customerId", ["name", "officeName"])
          .sort({ createdAt: -1 });
        const count = orders.length;
        return res.status(200).json({ data: { orders, count } });
      }
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async editorAllCustomers(req, res) {
    try {
      const customers = await Customer.find(
        { editors: req.editor._id },
        { password: 0, __v: 0, editors: 0 }
      ).sort({ createdAt: -1 });
      const count = customers.length;
      return res.status(201).json({ data: { customers, count } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async editorViewSingleCustomer(req, res) {
    try {
      const customerId = req.params.customerId;
      const customer = await Customer.findOne(
        { _id: customerId, editors: req.editor._id },
        { password: 0, __v: 0, editors: 0 }
      );
      return res.status(201).json({ data: { customer, count: 1 } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },
  async editorRemoveCustomer(req, res) {
    try {
      const customerId = req.params.customerId;
      const customer = await Customer.findOne({
        _id: customerId,
        editors: req.editor._id
      });
      if (!customer)
        return res
          .status(404)
          .json({ error: { message: "No customer found" } });
      customer.editors.remove(req.editor._id);
      customer.save();
      const editor = await Editor.findOne({ _id: req.editor._id });
      editor.customers.remove(customerId);
      editor.save();
      return res
        .status(200)
        .json({ success: { message: "customer removed successfully" } });
    } catch (error) {
      return res.status(500).send({ error: { messsage: error.message } });
    }
  },

  async editorSearchCustomers(req, res) {
    try {
      const officeName = req.query.officeName;
      const customers = await Customer.find(
        {
          officeName: { $regex: `${officeName}`, $options: "i" },
          editors: req.editor._id
        },
        { password: 0, __v: 0, editors: 0 }
      ).sort({ officeName: 1 });
      const count = customers.length;
      return res.status(200).json({ data: { customers, count } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async editorCustomerOrders(req, res) {
    try {
      const customerId = req.params.customerId;
      const orders = await Order.find(
        { customerId, editorId: req.editor._id },
        { __v: 0 }
      )
        .populate("customerId", ["name", "officeName"])
        .sort({ createdAt: -1 });
      const count = orders.length;
      return res.status(200).json({ data: { orders, count } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async editorSearchOrders(req, res) {
    try {
      const titleOfOrder = req.query.titleOfOrder;
      const orders = await Order.find(
        {
          titleOfOrder: { $regex: `${titleOfOrder}`, $options: "i" },
          editorId: req.editor._id
        },
        { __v: 0 }
      )
        .populate("customerId", ["name", "officeName"])
        .sort({ createdAt: -1 });
      const count = orders.length;
      return res.status(200).json({ data: { orders, count } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async editorViewSingleOrder(req, res) {
    try {
      const orderId = req.params.orderId;
      const order = await Order.findOne(
        { _id: orderId, editorId: req.editor._id },
        { __v: 0 }
      ).populate("customerId", ["name", "officeName"]);
      return res.status(200).json({ data: { order, count: 1 } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  }
};
