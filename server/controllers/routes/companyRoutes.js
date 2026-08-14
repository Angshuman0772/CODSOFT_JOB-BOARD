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
} from "../controllers/companyControllers.js";
import upload from "../../config/multer.js";

const router = express.Router();

// register a company
router.post("/register", upload.single("image"), registerCompany);

// company login
router.post("/login", loginCompany);

// get company data
router.get("/company-data", getCompanyData);

// post new job
router.post("/post-job", postJob);

// get company job applicants
router.get("/applicants", getJobApplicants);

// get all jobs posted by company
router.get("/jobs", getCompanyJobs);

// change job application status
router.post("/change-status", changeJobApplicationStatus);

// change job visibility
router.post("/change-visibility", changeJobVisibility);

export default router;