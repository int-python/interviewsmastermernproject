import express from "express";
// import {} from "../controllers/project.js";

import { isAuthenticated } from "../middlewares/auth.js";

import { upload } from "../middlewares/multer.js";
import {
  createProducts,
  deleteProducts,
  getProducts,
  updateProducts,
} from "../controllers/product.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const router = express.Router();

router.post(
  "/createProducts",
  isAuthenticated,
  upload.single("productImg"),
  createProducts
);

router.get("/getproducts", getProducts);
router.put(
  "/updateproduct/:id",
  isAuthenticated,
  authAdmin,
  upload.single("productImg"),
  updateProducts
);
router.delete("/deleteproduct/:id", isAuthenticated, authAdmin, deleteProducts);

export default router;
