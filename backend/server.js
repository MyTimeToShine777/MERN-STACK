import "express-async-errors";
import colors from "colors";
import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
dotenv.config();
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Routes

app.use("/api/users", userRoutes);
app.use("/api/v1/goals", goalRoutes);

//ErrorMiddleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
//Server
const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      PORT,
      console.log(`Server listening on Port ${PORT}...`.bgCyan.bold)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
