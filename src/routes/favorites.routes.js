import express from "express";
import User from "../models/User.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

/**
 * GET /api/favorites
 * => renvoie la liste des ids favoris
 */
router.get("/", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("favorites");
    if (!user) return res.status(401).json({ message: "User not found" });

    return res.status(200).json({ favorites: user.favorites });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/favorites/:movieId
 * => ajoute un favori
 */
router.post("/:movieId", requireAuth, async (req, res) => {
  try {
    const { movieId } = req.params;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $addToSet: { favorites: movieId } },
      { new: true }
    ).select("favorites");

    if (!user) return res.status(401).json({ message: "User not found" });

    return res.status(200).json({ favorites: user.favorites });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/favorites/:movieId
 * => retire un favori
 */
router.delete("/:movieId", requireAuth, async (req, res) => {
  try {
    const { movieId } = req.params;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { favorites: movieId } },
      { new: true }
    ).select("favorites");

    if (!user) return res.status(401).json({ message: "User not found" });

    return res.status(200).json({ favorites: user.favorites });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
