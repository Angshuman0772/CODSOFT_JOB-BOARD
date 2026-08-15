import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

// get user data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, data: user });
  } catch (error) {
    return res.json({ success: false, message: "Error fetching user data" });
  }
};

// apply for a job
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
    }
  } catch (error) {
    return res.json({ success: false, message: "Error applying for job" });
  }
};

// get all jobs applied by user
export const getUserJobApplications = async (req, res) => {};
try {
  const userId = req.auth.userId;
  const applications = await JobApplication.find({ userId })
    .populate("companyId", "name email image")
    .populate("jobId", "title description location salary level category")
    .exec();
  if (!applications) {
    return res.json({ success: false, message: "No job applications found" });
  }
  return res.json({ success: true, applications });
} catch (error) {
  return res.json({
    success: false,
    message: "Error fetching job applications",
  });
}
// update user profile (resume)
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.resumeFile;
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
