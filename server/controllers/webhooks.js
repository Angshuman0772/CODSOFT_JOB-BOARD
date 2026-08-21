/**
 * Clerk webhook controller.
 *
 * Purpose: synchronize Clerk user lifecycle events into the local User collection.
 */
import { Webhook } from "svix";

import User from "../models/User.js";

/**
 * Validates a Clerk webhook request and upserts/deletes matching local users.
 *
 * @param {import("express").Request} req - Express request with raw webhook payload.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends an empty JSON object for handled events.
 * @sideeffects Reads Svix headers and writes to User collection based on event type.
 */
const clerkWebhooks = async (req, res) => {
  try {
    // Verification must happen against the unmodified raw request body.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body.toString();

    // verify headers
    await whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // get data from request body
    const { data, type } = JSON.parse(payload);

    // Keep per-event handling explicit to match Clerk's lifecycle payload shapes.
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name:
            `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
          image: data.image_url,
          resume: "",
        };
        await User.findByIdAndUpdate(data.id, userData, {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        });
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name:
            `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default clerkWebhooks;
