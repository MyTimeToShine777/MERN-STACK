import express from "express";
const router = express.Router();

import {
  getGoals,
  getSingleGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} from "../controllers/controller.js";

router.route("/").get(getGoals).post(setGoals);
router.route("/:id").get(getSingleGoals).put(updateGoals).delete(deleteGoals);

export default router;
