/**
 * Job catalog controller.
 *
 * Purpose: serve public job listings and individual job details.
 */
import Job from "../models/Job.js";

/**
 * Returns all visible jobs with associated company details.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends JSON with job list and operation status.
 * @sideeffects Reads from the Job collection.
 */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });
    res.json({ success: true, jobs });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Returns a single job by its id.
 *
 * @param {import("express").Request} req - Express request object with req.params.id.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends JSON containing the job payload when found.
 * @sideeffects Reads from the Job collection.
 */
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });
    if (!job) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }
    res.json({ success: true, job });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
