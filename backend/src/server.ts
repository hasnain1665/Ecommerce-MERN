import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/index";

// configure env
dotenv.config();

// database connection
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on ${port}.`);
});
