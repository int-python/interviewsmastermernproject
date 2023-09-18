import { User } from "../models/user.js";

export const authAdmin = async (req, res, next) => {
  try {
    // get users information by identifier

    const user = await User.findOne({
      _id: req.user._id,
    });
    if (user.role !== "Admin")
      return res.status(404).json({ message: "Admin access denied" });
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
