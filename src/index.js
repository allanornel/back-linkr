import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index.js";

//express config
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//routes
app.use(router);

//open server
app.listen(process.env.PORT, () =>
  console.log("Server ON port " + process.env.PORT)
);