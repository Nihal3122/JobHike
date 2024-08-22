import express from "express";
import {
  getAllJobs,
  getJobById,
  getJobsByRecruiter,
  postJob,
} from "../Controllers/jobController.js";
import { verifyJwt } from "../Middlewares/auth.js";

const router = express.Router();
router.route("/post-job").post(verifyJwt, postJob);
router.route("/get-jobs").get(verifyJwt, getAllJobs);
router.route("/get-job/:id").get(verifyJwt, getJobById);
router.route("/recruiter/jobs").get(verifyJwt, getJobsByRecruiter);

export default router;
