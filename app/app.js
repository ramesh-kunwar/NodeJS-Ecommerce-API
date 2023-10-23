import express from "express";
import dbConnect from "../config/dbConnect.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
dbConnect();

export default app;
