// Models
const Admin = require("../models/Admin");
const Editor = require("../models/Editor");

// Utils
const { forgotPasswordMailing } = require("../utils/nodeMailer");

// NPM packages
const [{ sign }, { hash, compare }] = [
  require("jsonwebtoken"),
  require("bcryptjs")
];

module.exports = {
  async adminProfile(req, res) {
    try {
      const user = await Admin.findById(req.admin._id);
      return res.status(200).json({
        data: {
          user
        }
      });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async adminForgotPasswordOtp(req, res) {
    try {
      const email = req.body.email;
      const mobile = req.body.mobile;
      if (!email || !mobile)
        return res
          .status(400)
          .json({ error: { message: "enter email and mobile number" } });
      const admin = await Admin.findOne({ email, mobile });
      if (!admin)
        return res
          .status(401)
          .json({ error: { message: "Incorrect Credentials " } });
      if (admin.blockTime < new Date().getTime()) {
        admin.blockTime = null;
        admin.isTempBlocked = false;
        admin.otpAttempts = 0;
      }
      if (admin.isTempBlocked)
        return res.status(403).json({
          error: {
            message: "Your otps has been temporarily blocked for one day"
          }
        });
      const otp = Math.floor(Math.random() * 10000).toString();
      admin.otp = otp;
      admin.save();
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

  async adminForgotPasswordReset(req, res) {
    try {
      const otp = req.body.otp;
      const email = req.body.email;
      const newPassword = req.body.newPassword;
      if (!otp || !newPassword)
        return res
          .status(400)
          .json({ error: { message: "enter otp and new password" } });
      const admin = await Admin.findOne({ email });
      if (!admin)
        return res.status(401).json({ error: { message: "No user found " } });
      if (admin.otpAttempts >= 3) {
        return res.status(403).json({
          error: {
            message: "Your otps has been temporarily blocked for one day"
          }
        });
      }
      if (admin.otp !== otp) {
        admin.otpAttempts = admin.otpAttempts + 1;

        const attempts = 3 - admin.otpAttempts;
        if (attempts === 0) {
          admin.isTempBlocked = true;
          admin.otp = "";
          var blockTime = new Date().setHours(new Date().getHours() + 24);
          admin.blockTime = blockTime;
          admin.save();
          return res.status(403).json({
            error: {
              message: "Your otps has been temporarily blocked for one day"
            }
          });
        }
        admin.save();
        return res.status(403).json({
          error: {
            message: `Incorrect OTP, You have ${attempts} more attempts for otp validation`
          }
        });
      }
      const password = await hash(newPassword, 10);
      admin.password = password;
      admin.save();
      return res.status(201).json({
        success: {
          message: "Password has been successfully reset."
        }
      });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },
  async adminLogin(req, res) {
    try {
      var email = req.body.email;
      var password = req.body.password;
      if (!email || !password)
        return res
          .status(400)
          .json({ error: { message: "Incorrect credentials" } });
      const admin = await Admin.findOne({ email });
      if (!admin)
        return res
          .status(400)
          .json({ error: "Incorrect credentials(email not found)" });
      const isMatched = await compare(password, admin.password);
      if (!isMatched)
        return res.status(400).send({
          error: { message: "Incorrect credentials(password not matched" }
        });
      const token = await sign(
        { _id: admin._id },
        process.env.JSON_WEB_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      admin.jsonWebToken = token;
      admin.save();
      res.status(200).json({ data: { jsonWebToken: token, name: admin.name } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async adminCount(req, res) {
    try {
      const totalEditorsCount = await Editor.find().countDocuments();
      const requestedEditorsCount = await Editor.find({
        status: `requested`
      }).countDocuments();
      const activeEditorsCount = await Editor.find({
        status: `active`
      }).countDocuments();
      const blockedEditorsCount = await Editor.find({
        status: `blocked`
      }).countDocuments();
      return res.status(200).json({
        data: {
          totalEditorsCount,
          requestedEditorsCount,
          activeEditorsCount,
          blockedEditorsCount
        }
      });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async adminFilterEditors(req, res) {
    try {
      const editors = await Editor.find({
        status: req.query.status
      }).sort({ createdAt: -1 });
      const count = editors.length;
      const newEditors = [];
      editors.forEach((ele) => {
        const newEditorsObj = ele.toObject();
        delete newEditorsObj.password;
        delete newEditorsObj.__v;
        delete newEditorsObj.customers;
        delete newEditorsObj.jsonWebToken;
        newEditors.push(newEditorsObj);
      });
      return res.status(200).json({ data: { editors: newEditors, count } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },
  async adminSearchEditors(req, res) {
    try {
      const officeName = req.query.officeName;
      const editors = await Editor.find(
        { officeName: { $regex: officeName, $options: "i" } },
        { password: 0, __v: 0, customer: 0, jsonWebToken: 0 }
      ).sort({ officeName: 1 });
      const count = editors.length;
      return res.status(200).json({ data: { editors, count } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },

  async adminViewSingleEditor(req, res) {
    try {
      const editorId = req.params.editorId;
      const editor = await Editor.findOne(
        { _id: editorId },
        { password: 0, __v: 0, customer: 0, jsonWebToken: 0 }
      );
      return res.status(200).json({ data: { editor, count: 1 } });
    } catch (error) {
      return res.status(500).json({ error: { message: error.message } });
    }
  },
  async adminUpdateEditor(req, res) {
    try {
      const editorId = req.params.editorId;
      var status = req.body.status;
      await Editor.findOneAndUpdate({ _id: editorId }, { status });
      return res
        .status(201)
        .json({ success: { message: "editor updated successfully" } });
    } catch (error) {
      return res.status(500).send({ error: { message: error.message } });
    }
  },
  async adminForgotPassword(req, res) {
    try {
      const email = req.body.email;
      const mobile = req.body.mobile;
      if (!email || !mobile) return res.json("enter email and mobile number");
      const admin = await Admin.findOne({ email, mobile });
      if (!admin)
        return res
          .status(401)
          .json({ error: { message: "Incorrect Credentials " } });
      const rawPassword = Math.floor(Math.random() * 100000000).toString();
      const hashedPassword = await hash(rawPassword, 10);
      admin.password = hashedPassword;
      admin.save();
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

  async adminChangePassword(req, res) {
    try {
      const currentPassword = req.body.currentPassword;
      const newPassword = req.body.newPassword;
      const isVerified = await compare(currentPassword, req.admin.password);
      if (!isVerified)
        return res
          .status(401)
          .json({ error: { message: "current password is wrong" } });
      const hashedPassword = await hash(newPassword, 10);
      await Admin.findOneAndUpdate(
        { _id: req.admin._id },
        { password: hashedPassword }
      );
      return res
        .status(201)
        .json({ success: { message: "admin password changed successfully" } });
    } catch (error) {
      return res.status(500).send({ error: { message: error.message } });
    }
  },

  async adminLogout(req, res) {
    try {
      await Admin.findOneAndUpdate(
        { _id: req.admin._id },
        { jsonWebToken: null }
      );
      return res.status(200).json({
        success: { message: "admin logged out successfully" }
      });
    } catch (error) {
      return res.status(500).send({ error: { message: error.message } });
    }
  }
};
