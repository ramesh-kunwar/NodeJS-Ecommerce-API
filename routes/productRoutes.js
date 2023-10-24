import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createProduct, getProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.route("/products").post(isLoggedIn, createProduct).get(getProduct)


export default router;
