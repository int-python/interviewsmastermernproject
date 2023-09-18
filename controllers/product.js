import ErrorHandler from "../middlewares/error.js";
import { Product } from "../models/product.js";
import * as fs from "fs";

class APIfeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };

    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((e) => delete queryObj[e]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    // mongodb fillter querys

    // $gte = greater then or equal
    // $lte = lesser then or equal
    // $gt = greater then
    // $lt = lesser then
    // $gte = greater then or equal
    // $regex = pattern to match

    this.query.find(JSON.parse(queryStr));

    return this;
  }
}

export const createProducts = async (req, res, next) => {
  try {
    const { title, price, dissPrice, offPer, category } = req.body;

    const file = req.file;

    if (!file) {
      return next(error);
    }
    if (file.size > 5 * 1024 * 1024) {
      remmovTmp(file.path);

      return res
        .status(400)
        .json({ message: "Image Size should be less then 5Mb" });
    }

    let images = [];
    let img = fs.readFileSync(file.path);

    remmovTmp(file.path);

    const img64 = img.toString("base64");

    const finalImg = {
      filename: file.originalname,
      contentType: file.mimetype,
      imageBase64: img64,
    };
    images.push(finalImg);

    await Product.create({
      title,
      price,
      dissPrice,
      offPer,
      category,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Product added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    // const products = await Product.find().sort({ _id: -1 });

    const features = new APIfeature(Product.find(), req.query).filtering();

    const products = await features.query;

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    const { title, price, dissPrice, offPer, category } = req.body;

    if (!product) return next(new ErrorHandler("Product not found", 404));

    // product.isCompleted = !product.isCompleted;
    const file = req.file;

    if (!file) {
      return next(error);
    }
    if (file.size > 5 * 1024 * 1024) {
      remmovTmp(file.path);

      return res
        .status(400)
        .json({ message: "Image Size should be less then 5Mb" });
    }

    let images = [];
    let img = fs.readFileSync(file.path);

    remmovTmp(file.path);

    const img64 = img.toString("base64");

    const finalImg = {
      filename: file.originalname,
      contentType: file.mimetype,
      imageBase64: img64,
    };

    images.push(finalImg);

    product.title = title;
    product.price = price;
    product.dissPrice = dissPrice;
    product.offPer = offPer;
    product.category = category;
    product.images = images;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Updated!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProducts = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler("Product not found", 404));
    await product.deleteOne();

    res.status(200).json({
      message: "Product Deleted!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
const remmovTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
