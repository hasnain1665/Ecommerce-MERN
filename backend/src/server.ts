import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/index";
import cookieParser from "cookie-parser";

// routes import
import userRouter from "./routes/userRoutes";

// configure env
dotenv.config();

// database connection
connectDB();

// app setup
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(cookieParser());

// routes declaration
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hasnain");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${port}.`);
});
