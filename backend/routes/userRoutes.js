import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/userController.js";

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(getMe);

export default router;
