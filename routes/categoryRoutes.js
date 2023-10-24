import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createCategory } from "../controllers/category.controller.js";
const router = express.Router();

router.route("/categories").post(isLoggedIn, createCategory) 


export default router;
