/**
 * User controller.
 *
 * Purpose: manage candidate profile state and job application workflows.
 */
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

/**
 * Fetch the currently authenticated user's data from MongoDB.
 *
 * Purpose:
 * - Uses the Clerk user ID from the authenticated request.
 * - Retrieves the corresponding user document from the database.
 * - Returns the user data to the frontend.
 *
 * Note:
 * - This function does NOT create a user.
 * - User creation is handled by the Clerk webhook (user.created event).
 */
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/**
 * Creates a job application for the authenticated user.
 *
 * @param {import("express").Request} req - Request with req.body.jobId and req.auth.userId.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends application result status.
 * @sideeffects Writes to JobApplication collection after duplicate and existence checks.
 */
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;
  try {
    const isAlreadyApplied = await JobApplication.findOne({
      userId,
      jobId,
    });
    if (isAlreadyApplied) {
      return res.json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.json({ success: false, message: "Job not found" });
    }

    await JobApplication.create({
      userId,
      companyId: jobData.companyId,
      jobId,
      date: Date.now(),
    });

    return res.json({ success: true, message: "Job application successful" });
  } catch (error) {
    return res.json({ success: false, message: "Error applying for job" });
  }
};

/**
 * Returns all applications submitted by the authenticated user.
 *
 * @param {import("express").Request} req - Request containing req.auth.userId.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends application list with populated company and job references.
 * @sideeffects Reads from JobApplication and related collections.
 */
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location salary level category")
      .exec();

    if (!applications || applications.length === 0) {
      return res.json({ success: false, message: "No job applications found" });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error fetching job applications",
    });
  }
};
/**
 * Updates user profile fields currently centered on resume upload.
 *
 * @param {import("express").Request} req - Request containing req.auth.userId and parsed resume file.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends update status response.
 * @sideeffects Uploads files to Cloudinary and persists the updated User document.
 */
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;
    const userData = await User.findById(userId);

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    }
    await userData.save();
    return res.json({ success: true, message: "Resume updated successfully" });
  } catch (error) {
    return res.json({ success: false, message: "Error updating user profile" });
  }
};
