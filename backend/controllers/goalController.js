import { StatusCodes } from "http-status-codes";
import Goal from "../models/goalModel.js";
import { createCustomAPIError } from "../errors/custom-error.js";

//Desc Get All Goals
//Route /api/v1/goals (GET)
//Access Private
const getGoals = async (req, res) => {
  const goals = await Goal.find({});
  res.status(StatusCodes.OK).json({ nbHits: goals.length, goals });
};
//Desc Post Goals
//Route /api/v1/goals (POST)
//Access Private
const setGoals = async (req, res) => {
  const setGoal = await Goal.create(req.body);
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
  const deletedGoal = await Goal.findByIdAndDelete(id);
  if (!deletedGoal) {
    return next(
      createCustomAPIError(`No Goal with ID: ${id}`, StatusCodes.NOT_FOUND)
    );
  }
  res.status(StatusCodes.OK).json({ deletedGoal });
};

export { getGoals, getSingleGoals, setGoals, updateGoals, deleteGoals };
