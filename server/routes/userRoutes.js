/**
 * Authenticated user route definitions.
 *
 * Purpose: expose candidate profile and job-application endpoints protected by Clerk auth.
 */
import express from "express";
import { getAuth } from "@clerk/express";
import {
  getUserData,
  applyForJob,
  getUserJobApplications,
  updateUserProfile,
} from "../controllers/userController.js";
import upload from "../config/multer.js";

const router = express.Router();

const requireAuthCustom = (req, res, next) => {
  const auth = getAuth(req);
  // console.log(
  //   "DEBUG requireAuthCustom - userId:",
  //   auth.userId,
  //   "headers:",
  //   req.headers.authorization?.slice(0, 20),
  // );
  if (!auth.userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  req.auth = auth;
  next();
};

// ...

router.use(requireAuthCustom);

// get user data
router.get("/user", getUserData);

// apply for a job
router.post("/apply", applyForJob);

// get all jobs applied by user
router.get("/applications", getUserJobApplications);

// update user profile (resume)
router.post("/update-profile", upload.single("resume"), updateUserProfile);

export default router;
