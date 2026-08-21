import express from "express";
import { requireAuth } from "@clerk/express";
import {
  getUserData,
  applyForJob,
  getUserJobApplications,
  updateUserProfile,
} from "../controllers/userController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.use(requireAuth());

// get user data
router.get("/user", getUserData);

// apply for a job
router.post("/apply", applyForJob);

// get all jobs applied by user
router.get("/applications", getUserJobApplications);

// update user profile (resume)
router.post("/update-profile", upload.single("resume"), updateUserProfile);

export default router;
