import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./Routes/AuthRouter.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// config
dotenv.config();

//db setup
const mongo_url = process.env.MONGO;
mongoose.connect(mongo_url).then(() => {
  console.log("database connected");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running ${port}`);
});

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//route middleware
app.use("/api", AuthRouter);

//test route
app.get("/test", async (req, res) => {
  res.json(errorJson("validate_error", [{ name: "required" }]));
});
