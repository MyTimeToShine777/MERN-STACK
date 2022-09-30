import "express-async-errors";
import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
dotenv.config();
import routes from "./routes/routes.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";

//Middleware
app.use(express.json());
//Routes
app.use("/api/v1/goals", routes);

//ErrorMiddleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
//Server
const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server listening on Port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
