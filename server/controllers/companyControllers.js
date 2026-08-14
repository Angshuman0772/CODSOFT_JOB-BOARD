import Company from "../models/companyModel.js";
import bcrypt from "bcrypt";

// register new company
export const registerCompany = async (req, res) => {
  const { email, password, image } = req.body;

  // access the uploaded image file
  const imageFile = req.file;

  if (!email || !password || !imageFile) {
    return res
      .status(400)
      .json({ message: "Email, password, and image are required." });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.status(400).json({ message: "Company already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    

  } catch (error) {
    return res.status(500).json({ message: "Error checking company existence." });
  }
};

// company login
export const loginCompany = async (req, res) => {};

// get company data
export const getCompanyData = async (req, res) => {};

// post new job
export const postJob = async (req, res) => {};

// get company job applicants
export const getJobApplicants = async (req, res) => {};

// get all jobs posted by company
export const getCompanyJobs = async (req, res) => {};

// change job application status
export const changeJobApplicationStatus = async (req, res) => {};

// change job visibility
export const changeJobVisibility = async (req, res) => {};
