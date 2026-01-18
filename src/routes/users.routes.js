import express from "express";
import User from "../models/User.js";
import Review from "../models/Review.js";

const router = express.Router();

/**
 * GET /api/users/:username
 * Public: fiche utilisateur + ses reviews publiques
 */
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("_id username email").lean();
    if (!user) return res.status(404).json({ message: "Not found" });

    const reviews = await Review.find({ username, visibility: "public" })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      user: { id: user._id, username: user.username },
      reviews,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
