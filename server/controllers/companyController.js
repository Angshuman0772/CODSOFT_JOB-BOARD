/**
 * Company controller.
 *
 * Purpose: handle recruiter authentication and job-management operations.
 */
import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

/**
 * Registers a new company account and stores its logo in Cloudinary.
 *
 * @param {import("express").Request} req - Request with company credentials and uploaded image.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends created company payload with auth token.
 * @sideeffects Writes to Company collection and uploads media to Cloudinary.
 */
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  // access the uploaded image file
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.status(400).json({
      success: false,
      message: "Name, email, password, and image are required.",
    });
  }

  try {
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.status(400).json({
        success: false,
        message: "Company already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Company registered successfully.",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error("FULL ERROR:", error);
    console.error("STACK:", error.stack);

    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

/**
 * Authenticates an existing company and issues a JWT.
 *
 * @param {import("express").Request} req - Request with email and password.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends authenticated company payload and token.
 * @sideeffects Reads from Company collection.
 */
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    if (await bcrypt.compare(password, company.password)) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Returns authenticated company profile data from middleware context.
 *
 * @param {import("express").Request} req - Request containing req.company.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends company profile payload.
 * @sideeffects None.
 */
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Creates a new job posting for the authenticated company.
 *
 * @param {import("express").Request} req - Request with job fields.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends status and created job payload.
 * @sideeffects Writes to the Job collection.
 */
export const postJob = async (req, res) => {
  const { title, description, location, category, level, salary, date } =
    req.body;
  const companyId = req.company._id;

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      date: Date.now(),
      level,
      category,
      companyId,
    });
    await newJob.save();

    // Keep this read to preserve current behavior and flow, even though newJob is available.
    const foundJob = await Job.findById(newJob._id);
    res.json({
      success: true,
      message: "Job posted successfully.",
      job: newJob,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Placeholder for fetching applicants grouped by company jobs.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} No-op in current implementation.
 * @sideeffects None.
 */
export const getJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;

    // find job applications for the user and populate related data
    const applications = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Returns all jobs posted by the authenticated company with applicant counts.
 *
 * @param {import("express").Request} req - Request containing req.company.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends enriched company job list.
 * @sideeffects Reads from Job and JobApplication collections.
 */
export const getCompanyJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    // Applicant count is derived per job because counts are not denormalized on Job documents.
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      }),
    );

    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Placeholder for changing application status from recruiter dashboard actions.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} No-op in current implementation.
 * @sideeffects None.
 */
export const changeJobApplicationStatus = async (req, res) => {};

/**
 * Toggles visibility for a company-owned job posting.
 *
 * @param {import("express").Request} req - Request with target job id in req.body.id.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends updated job payload.
 * @sideeffects Updates the Job document visibility flag.
 */
export const changeJobVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job = await Job.findById(id);
    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }
    await job.save();
    res.json({ success: true, job });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
