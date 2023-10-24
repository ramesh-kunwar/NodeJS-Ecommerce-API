import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";

// import routes
import userRoutes from "../routes/userRoutes.js";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";

const app = express();
dbConnect();



// middleware
app.use(express.json());


// mounting routes

app.use("/api/v1", userRoutes);

// error middleware
app.use(notFound)
app.use(globalErrHandler);

export default app;
