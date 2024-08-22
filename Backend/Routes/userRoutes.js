import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../Controllers/userController.js";
import { verifyJwt } from "../Middlewares/auth.js";
import { singleUpload } from "../Middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/update-profile").post(verifyJwt,singleUpload, updateUserProfile);

export default router;
