import express from "express";
const router = express.Router();

import {
  getGoals,
  getSingleGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} from "../controllers/goalController.js";

import protectRoute from "../middleware/authMiddleware.js";

router.route("/").get(protectRoute, getGoals).post(protectRoute, setGoals);
router
  .route("/:id")
  .get(protectRoute, getSingleGoals)
  .put(protectRoute, updateGoals)
  .delete(protectRoute, deleteGoals);

export default router;
