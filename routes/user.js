import express from "express";
import {
  addCart,
  getMyProfile,
  login,
  logout,
  register,
  verify,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/verify", verify);

router.get("/infor", isAuthenticated, getMyProfile);
router.get("/adminInfor", isAuthenticated, authAdmin, getMyProfile);

router.patch("/addcart", isAuthenticated, addCart);

router.get("/logout", logout);

export default router;
