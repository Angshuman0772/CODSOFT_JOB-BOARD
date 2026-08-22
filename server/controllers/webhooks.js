/**
 * Clerk webhook controller.
 *
 * Purpose: synchronize Clerk user lifecycle events into the local User collection.
 */

import { Webhook } from "svix";
import User from "../models/User.js";

/**
 * Validates a Clerk webhook request and synchronizes users with MongoDB.
 */
const clerkWebhooks = async (req, res) => {
  console.log("\n==============================");
  console.log("WEBHOOK REQUEST RECEIVED");
  console.log("==============================");

  try {
    console.log("Headers:");
    console.log({
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("CLERK_WEBHOOK_SECRET is missing");
      return res.status(500).json({
        success: false,
        message: "Webhook secret not configured",
      });
    }

    const whook = new Webhook(webhookSecret);

    const payload = req.body.toString();

    console.log("Verifying webhook signature...");

    await whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    console.log("Webhook verification successful");

    const { data, type } = JSON.parse(payload);

    console.log("Event Type:", type);
    console.log("Clerk User ID:", data?.id);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          name:
            `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
          image: data.image_url,
          resume: "",
        };

        console.log("Creating/updating MongoDB user:");
        console.log(userData);

        await User.findByIdAndUpdate(data.id, userData, {
          upsert: true,
          new: true,
        });

        console.log("User synced successfully");

        return res.json({ success: true });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address,
          name:
            `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
          image: data.image_url,
        };

        console.log("Updating user:", data.id);

        await User.findByIdAndUpdate(data.id, userData);

        console.log("User updated successfully");

        return res.json({ success: true });
      }

      case "user.deleted": {
        console.log("Deleting user:", data.id);

        await User.findByIdAndDelete(data.id);

        console.log("User deleted successfully");

        return res.json({ success: true });
      }

      default:
        console.log("Unhandled event type:", type);
        return res.json({ success: true });
    }
  } catch (error) {
    console.error("WEBHOOK ERROR");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default clerkWebhooks;
