/**
 * Company authentication middleware.
 *
 * Purpose: validate recruiter JWT tokens and attach company context to requests.
 */
import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

/**
 * Verifies company JWT and populates req.company for downstream handlers.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Middleware continuation callback.
 * @returns {Promise<void|import("express").Response>} Sends 401 on auth failure, otherwise forwards request.
 * @sideeffects Reads req.headers.token and assigns req.company on success.
 */
export const protectCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.company = await Company.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
