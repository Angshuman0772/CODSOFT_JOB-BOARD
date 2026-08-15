import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";
import Job from "../models/Job.js";

// register new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  // access the uploaded image file
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.status(400).json({
      message: "Name, email, password, and image are required.",
    });
  }

  try {
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.status(400).json({
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

// company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (bcrypt.compare(password, company.password)) {
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
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get company data
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

// post new job
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

    res.json({ success: true, newJob });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// get company job applicants
export const getJobApplicants = async (req, res) => {};

// get all jobs posted by company
export const getCompanyJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    // TODO: add number of applicants for each job

    res.json({ success: true, jobs });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// change job application status
export const changeJobApplicationStatus = async (req, res) => {};

// change job visibility
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
