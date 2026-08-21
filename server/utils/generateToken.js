/**
 * JWT creation utility for company authentication.
 *
 * Purpose: generate signed access tokens consumed by protected company routes.
 */
import jwt from "jsonwebtoken";

/**
 * Creates a signed JWT for a company user.
 *
 * @param {string} id - Company document identifier embedded in the token payload.
 * @returns {string} Signed JWT valid for 30 days.
 * @sideeffects None.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
