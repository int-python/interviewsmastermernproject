import { User } from "../models/user.js";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
import { sendMail } from "../utils/sendMail.js";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  try {
    const { userEmail, userPassword } = req.body;

    let user = await User.findOne({ email: userEmail });

    if (user)
      return next(new ErrorHandler("User Already Exist with this mail", 400));

    if (userPassword.length < 6)
      return next(new ErrorHandler("Password should be longer then 6", 400));

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const otp = Math.floor(Math.random() * 1000000);

    user = await User.create({
      email: userEmail,
      password: hashedPassword,
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });

    await sendMail(userEmail, "Here is your OTP", `Here is your OTP: ${otp}`);

    sendCookie(user, res, "Otp Sent to your Email", 201, userEmail);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { userEmail, userPassword } = req.body;

    const user = await User.findOne({ email: userEmail }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(userPassword, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back`, 200);
  } catch (error) {
    next(error);
  }
};

export const addCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return next(new ErrorHandler("user dosent exist", 400));

    await User.findOneAndUpdate({ _id: req.user.id }, { cart: req.body.cart });
    return res.json({ success: true, message: "Product Added to Cart" });
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};

export const verify = async (req, res, next) => {
  try {
    const { email } = req.body;

    const otp = Number(req.body.otp);

    const user = await User.findOne({ email, varified: false }).sort({
      _id: -1,
    });

    if (user.otp !== otp || user.otp_expiry < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP or has been Expired" });
    }

    user.varified = true;
    user.otp = null;
    user.otp_expiry = null;

    await user.save();

    sendCookie(user, res, "Account Verified", 200);
  } catch (error) {
    next(error);
  }
};
