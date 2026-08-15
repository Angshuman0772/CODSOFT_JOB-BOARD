import express from "express";
import {
  registerCompany,
  loginCompany,
  getCompanyData,
  postJob,
  getJobApplicants,
  getCompanyJobs,
  changeJobApplicationStatus,
  changeJobVisibility,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";

const router = express.Router();

// register a company
router.post("/register", upload.single("image"), registerCompany);

// company login
router.post("/login", loginCompany);

// get company data
router.get("/company-data", protectCompany, getCompanyData);

// post new job
router.post("/post-job", protectCompany, postJob);

// get company job applicants
router.get("/applicants", protectCompany, getJobApplicants);

// get all jobs posted by company
router.get("/jobs", protectCompany, getCompanyJobs);

// change job application status
router.post("/change-status", protectCompany, changeJobApplicationStatus);

// change job visibility
router.post("/change-visibility", protectCompany, changeJobVisibility);

export default router;
