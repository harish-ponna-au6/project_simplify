// NPM package
const { Schema, model } = require("mongoose");

// Schema
const RazorpaySchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    orderValue: {
      type: String,
      required: true
    },
    razorpayOrderId: {
      type: String,
      required: true
    },
    razorpayPaymentId: {
      type: String
    },
    razorpaySignature: {
      type: String
    },
    isPending: {
      type: String
    }
  },
  { timestamps: true }
);

const Razorpay = model("razorpay", RazorpaySchema);

module.exports = Razorpay;
