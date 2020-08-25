// NPM package
const { Schema, model } = require("mongoose");

// Schema
const CustomerSchema = new Schema(
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
    officeName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },

    editors: [String],

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

const Customer = model("customer", CustomerSchema);

module.exports = Customer;
