// NPM package
const { Schema, model } = require("mongoose");

// Schema
const EditorSchema = new Schema(
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
    status: {
      type: String,
      required: true,
      default: "requested",
      enum: ["requested", "active", "blocked"]
    },

    customers: [String],

    jsonWebToken: {
      type: String
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

const Editor = model("editor", EditorSchema);

module.exports = Editor;
