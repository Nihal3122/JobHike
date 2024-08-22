import express from "express";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../Controllers/applicationController.js";
import { verifyJwt } from "../Middlewares/auth.js";

const router = express.Router();
router.route("/apply-job/:id").post(verifyJwt, applyJob);
router.route("/applied-job").get(verifyJwt, getAppliedJobs);
router.route("/jobs/applicants/:id").get(verifyJwt, getApplicants);
router.route("/update/application/:id").put(verifyJwt, updateStatus);


export default router;
