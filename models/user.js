import mongoose from "mongoose";

const schema = new mongoose.Schema({
  role: {
    type: String,
    default: "customer",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  cart: {
    type: Array,
    default: [],
  },
  otp: {
    type: Number,
  },
  varified: {
    type: Boolean,
    default: false,
  },
  otp_expiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

schema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

export const User = mongoose.model("User", schema);
