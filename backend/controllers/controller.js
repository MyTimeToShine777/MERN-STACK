import { StatusCodes } from "http-status-codes";

//Desc Get All Goals
//Route /api/v1/goals
//Access Private
const getGoals = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "Get Goals" });
};
//Desc Post Goals
//Route /api/v1/goals
//Access Private
const setGoals = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ msg: "Set Goals" });
};
//Desc Get Single Goals
//Route /api/v1/goals/:id
//Access Private
const getSingleGoals = async (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ msg: `Get Single Goals ${id}` });
};
//Desc Put Single Goals
//Route /api/v1/goals/:id
//Access Private
const updateGoals = async (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ msg: `Update Goals ${id}` });
};
//Desc Delete Single Goals
//Route /api/v1/goals/:id
//Access Private
const deleteGoals = async (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ msg: `Delete Goals ${id}` });
};

export { getGoals, getSingleGoals, setGoals, updateGoals, deleteGoals };
