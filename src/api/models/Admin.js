// NPM package
const { Schema, model } = require("mongoose");

// Schema
const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    jsonWebToken: {
      type: String,
      required: false
    },
    otp: {
      type: String
    },
    otpAttempts: {
      type: Number,
      default: 0
    },
    isTempBlocked: {
      type: Boolean,
      default: false
    },
    blockTime: {
      type: Number
    }
  },
  { timestamps: true }
);

const Admin = model("admin", AdminSchema);

module.exports = Admin;
