import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { createCustomAPIError } from "../errors/custom-error.js";

//Desc Register New User
//Route /api/users (POST)
//Access Public
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      createCustomAPIError("Please Add All Fields", StatusCodes.BAD_REQUEST)
    );
  }
  //Check User Exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(
      createCustomAPIError("User Already Exists", StatusCodes.BAD_REQUEST)
    );
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(StatusCodes.CREATED).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    return next(
      createCustomAPIError("Invalid User Data", StatusCodes.BAD_REQUEST)
    );
  }
};

//Desc Authenticate New User
//Route /api/users/login (POST)
//Access Public
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  //Check for User Email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(StatusCodes.OK).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    return next(
      createCustomAPIError("Invalid Credentials", StatusCodes.BAD_REQUEST)
    );
  }
};
//Desc   GET User dat
//Route /api/users/me (GET)
//Access Public
const getMe = async (req, res) => {
  res.status(StatusCodes.OK).send({ msg: "User data" });
};

export { registerUser, loginUser, getMe };
