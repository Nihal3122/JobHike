import express from "express";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../Controllers/companyController.js";
import { verifyJwt } from "../Middlewares/auth.js";
import { singleUpload } from "../Middlewares/multer.js";

const router = express.Router();
router.route("/register-company").post(verifyJwt, registerCompany);
router.route("/get-companies").get(verifyJwt, getCompany);
router.route("/get-company/:id").get(verifyJwt, getCompanyById);
router.route("/update-company/:id").put(verifyJwt,singleUpload, updateCompany);

export default router;
