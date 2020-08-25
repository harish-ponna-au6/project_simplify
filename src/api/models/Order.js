// NPM package
const { Schema, model } = require("mongoose");

// Schema
const orderSchema = new Schema(
  {
    editorId: {
      type: Schema.Types.ObjectId,
      ref: "editor",
      required: true
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: true
    },
    titleOfOrder: {
      type: String,
      required: true
    },
    typeOfOrder: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    outPutFormat: {
      type: String,
      required: true,
      enum: ["4k", "pendrive", "blu-ray", "hd"]
    },
    estimatedDateOfCompletion: {
      type: String,
      required: true
    },
    allotedEmployee: {
      type: String,
      required: true
    },
    totalAmountInINR: {
      type: Number,
      required: true
    },
    advanceAmountInINR: {
      type: Number,
      required: false
    },
    isPaymentCompleted: {
      type: Boolean,
      required: true
    },
    status: {
      type: String,
      default: "not_started",
      enum: ["not_started", "started", "completed", "cancelled"]
    }
  },
  { timestamps: true }
);

const Order = model("order", orderSchema);
module.exports = Order;
