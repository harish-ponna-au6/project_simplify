// Models
const Editor = require("../models/Editor");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
// NPM packages
const [{ sign }, { compare, hash }] = [
  require("jsonwebtoken"),
  require("bcryptjs")
];

// Utils
const { forgotPasswordMailing } = require("../utils/nodeMailer");

module.exports = {
  async customerProfile(req, res) {
    try {
      const user = await Customer.findById(req.customer._id);
      return res.status(200).json({
        data: {
          user
        }
      });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async customerForgotPasswordOtp(req, res) {
    try {
      const email = req.body.email;
      const mobile = req.body.mobile;
      if (!email || !mobile)
        return res
          .status(400)
          .json({ error: { message: "enter email and mobile number" } });
      const customer = await Customer.findOne({ email, mobile });
      if (!customer)
        return res
          .status(401)
          .json({ error: { message: "Incorrect Credentials " } });
      if (customer.blockTime < new Date().getTime()) {
        customer.blockTime = null;
        customer.isTempBlocked = false;
        customer.otpAttempts = 0;
      }
      if (customer.isTempBlocked)
        return res.status(403).json({
          error: {
            message: "Your otps has been temporarily blocked for one day"
          }
        });
      const otp = Math.floor(Math.random() * 10000).toString();
      customer.otp = otp;
      customer.save();
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

  async customerForgotPasswordReset(req, res) {
    try {
      const otp = req.body.otp;
      const newPassword = req.body.newPassword;
      const email = req.body.email;
      if (!otp || !newPassword)
        return res
          .status(400)
          .json({ error: { message: "enter otp and new password" } });
      const customer = await Customer.findOne({ email });
      if (!customer)
        return res.status(401).json({ error: { message: "Incorrect Email " } });
      if (customer.otpAttempts >= 3) {
        return res.status(403).json({
          error: {
            message: "Your otps has been temporarily blocked for one day"
          }
        });
      }
      if (customer.otp !== otp) {
        customer.otpAttempts = customer.otpAttempts + 1;

        const attempts = 3 - customer.otpAttempts;
        if (attempts === 0) {
          customer.isTempBlocked = true;
          customer.otp = "";
          var blockTime = new Date().setHours(new Date().getHours() + 24);
          customer.blockTime = blockTime;
          customer.save();
          return res.status(403).json({
            error: {
              message: "Your otps has been temporarily blocked for one day"
            }
          });
        }
        customer.save();
        return res.status(403).json({
          error: {
            message: `Incorrect Otp, You have ${attempts} more attempts for otp validation`
          }
        });
      }
      const password = await hash(newPassword, 10);
      customer.password = password;
      customer.save();
      return res.status(201).json({
        success: {
          message: "Password has been successfully reset."
        }
      });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },
  async customerLogin(req, res) {
    try {
      var email = req.body.email;
      var password = req.body.password;
      if (!email || !password)
        return res
          .status(400)
          .json({ error: { message: "Incorrect credentials" } });
      const customer = await Customer.findOne({ email });
      if (!customer)
        return res.status(401).json({
          error: { message: "Incorrect credentials(email not found)" }
        });

      const isMatched = await compare(password, customer.password);
      if (!isMatched)
        return res.status(401).send({
          error: { message: "Incorrect credentials(password not matched)" }
        });

      const token = await sign(
        { _id: customer._id },
        process.env.JSON_WEB_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      customer.jsonWebToken = token;
      customer.save();
      return res
        .status(200)
        .json({ data: { jsonWebToken: token, name: customer.name } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },
  async customerForgotPassword(req, res) {
    try {
      const customer = await Customer.findOne({
        email: req.body.email,
        mobile: req.body.mobile
      });
      if (!customer)
        return res
          .status(401)
          .json({ error: { message: "Incorrect Credentials " } });
      const rawPassword = Math.floor(Math.random() * 100000000).toString();
      const hashedPassword = await hash(rawPassword, 10);
      customer.password = hashedPassword;
      customer.save();
      forgotPasswordMailing(req.body.email, rawPassword);
      return res.status(201).json({
        success: {
          message:
            "A System generated password has been sent to your email successfully. Login with that password and edit your password in profile section if needed"
        }
      });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },
  async customerChangePassword(req, res) {
    try {
      const currentPassword = req.body.currentPassword;
      const newPassword = req.body.newPassword;
      const isVerified = await compare(currentPassword, req.customer.password);
      if (!isVerified)
        return res
          .status(401)
          .json({ error: { message: "current password is wrong" } });
      const hashedPassword = await hash(newPassword, 10);
      await Customer.findOneAndUpdate(
        { _id: req.customer._id },
        { password: hashedPassword }
      );
      return res.status(201).json({
        success: { message: "customer password changed successfully" }
      });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  async customerLogout(req, res) {
    try {
      await Customer.findOneAndUpdate(
        { _id: req.customer._id },
        { jsonWebToken: null }
      );
      return res.status(200).json({
        success: { message: "customer successfully logged out" }
      });
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  },

  async customerOrdersInEditor(req, res) {
    try {
      const orders = await Order.find(
        { customerId: req.customer._id, editorId: req.params.editorId },
        { __v: 0 }
      ).sort({ createdAt: -1 });
      const count = orders.length;
      return res.status(200).json({ data: { orders, count } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },
  async customerSearchOrders(req, res) {
    try {
      const titleOfOrder = req.query.titleOfOrder;
      const orders = await Order.find({
        titleOfOrder: { $regex: `${titleOfOrder}`, $options: "i" },
        customerId: req.customer._id
      }).sort({ createdAt: -1 });
      const count = orders.length;
      return res.status(200).json({ data: { orders, count } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async customerAllEditors(req, res) {
    try {
      const editors = await Editor.find(
        { customers: req.customer._id },
        { password: 0, __v: 0, customers: 0, jsonWebToken: 0 }
      );
      return res.status(200).json({ data: { editors, count: 1 } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },
  async customerViewSingleOrder(req, res) {
    try {
      const order = await Order.findOne(
        { _id: req.params.orderId, customerId: req.customer._id },
        { __v: 0 }
      ).populate("editorId", ["name", "officeName"]);
      return res.status(200).json({ data: { order, count: 1 } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  }
};
