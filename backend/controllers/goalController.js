import { StatusCodes } from "http-status-codes";
import Goal from "../models/goalModel.js";
import User from "../models/userModel.js";
import { createCustomAPIError } from "../errors/custom-error.js";

//Desc Get All Goals
//Route /api/v1/goals (GET)
//Access Private
const getGoals = async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(StatusCodes.OK).json({ nbHits: goals.length, goals });
};
//Desc Set Goals
//Route /api/v1/goals (POST)
//Access Private
const setGoals = async (req, res, next) => {
  if (!req.body.text) {
    return next(
      createCustomAPIError("Please Add Text Field", StatusCodes.BAD_REQUEST)
    );
  }
  const setGoal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(StatusCodes.CREATED).json({ setGoal });
};
//Desc Get Single Goals
//Route /api/v1/goals/:id (GET)
//Access Private
const getSingleGoals = async (req, res, next) => {
  const { id } = req.params;
  const goal = await Goal.findById(id);
  if (!goal) {
    return next(
      createCustomAPIError(`No Goal with ID: ${id}`, StatusCodes.NOT_FOUND)
    );
  }
  res.status(StatusCodes.OK).json({ goal });
};
//Desc Put Single Goals
//Route /api/v1/goals/:id (PUT)
//Access Private
const updateGoals = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const goal = await Goal.findById(id);
  if (!goal) {
    return next(createCustomAPIError("Goal Not Found", StatusCodes.NOT_FOUND));
  }
  const user = await User.findById(req.user.id);
  //Check for login user
  if (!user) {
    return next(
      createCustomAPIError("User Not Found", StatusCodes.UNAUTHORIZED)
    );
  }
  //Make Sure the Logged in user Matches the Goal User
  if (goal.user.toString() !== user.id) {
    return next(
      createCustomAPIError("User Not Authorized", StatusCodes.UNAUTHORIZED)
    );
  }
  const updatedGoal = await Goal.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updatedGoal) {
    return next(
      createCustomAPIError(`No Goal with ID: ${id}`, StatusCodes.NOT_FOUND)
    );
  }
  res.status(StatusCodes.OK).json({ updatedGoal });
};
//Desc Delete Single Goals
//Route /api/v1/goals/:id (DELETE)
//Access Private
const deleteGoals = async (req, res, next) => {
  const { id } = req.params;
  const goal = await Goal.findById(id);
  if (!goal) {
    return next(createCustomAPIError("Goal Not Found", StatusCodes.NOT_FOUND));
  }

  const user = await User.findById(req.user.id);
  //Check for login user
  if (!user) {
    return next(
      createCustomAPIError("User Not Found", StatusCodes.UNAUTHORIZED)
    );
  }
  //Make Sure the Logged in user Matches the Goal User
  if (goal.user.toString() !== user.id) {
    return next(
      createCustomAPIError("User Not Authorized", StatusCodes.UNAUTHORIZED)
    );
  }

  const deletedGoal = await Goal.findByIdAndDelete(id);
  if (!deletedGoal) {
    return next(
      createCustomAPIError(`No Goal with ID: ${id}`, StatusCodes.NOT_FOUND)
    );
  }
  res.status(StatusCodes.OK).json({ deletedGoal });
};

export { getGoals, getSingleGoals, setGoals, updateGoals, deleteGoals };
