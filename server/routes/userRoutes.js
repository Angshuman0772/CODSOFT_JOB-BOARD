import express from "express";
import {
  getUserData,
  applyForJob,
  getUserJobApplications,
} from "../controllers/userControllers.js";

const router = express.Router();

// get user data
router.get("/user", getUserData);

// apply for a job
router.post("/apply", applyForJob);

// get all jobs applied by user
router.get("/applications", getUserJobApplications);

// update user profile (resume)
router.post("/update-profile", upload.single("resume"), updateUserProfile);

export default router;
