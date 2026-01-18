import express from "express";
import Review from "../models/Review.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

/**
 * GET /api/reviews?movieId=...&username=...
 * Public: liste (filtrable)
 */
router.get("/", async (req, res) => {
  try {
    const { movieId, username } = req.query;

    const filter = { visibility: "public" };
    if (movieId) filter.movieId = String(movieId);
    if (username) filter.username = String(username);

    const reviews = await Review.find(filter).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ reviews });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/reviews/:id
 * Public: détail (uniquement public pour l’instant)
 */
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).lean();
    if (!review) return res.status(404).json({ message: "Not found" });

    if (review.visibility !== "public") {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({ review });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/reviews
 * Auth: créer review
 */
router.post("/", requireAuth, async (req, res) => {
  try {
    const { movieId, title, content, rating, visibility } = req.body ?? {};

    if (!movieId || !title || !content) {
      return res.status(400).json({ message: "movieId, title, content are required" });
    }

    const review = await Review.create({
      movieId: String(movieId),
      userId: req.user.userId,
      username: req.user.username,
      title: String(title),
      content: String(content),
      rating: typeof rating === "number" ? rating : undefined,
      visibility: visibility ? String(visibility) : "public",
    });

    return res.status(201).json({ review });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * PATCH /api/reviews/:id
 * Auth: éditer (owner only)
 */
router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Not found" });

    if (review.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { title, content, rating, visibility } = req.body ?? {};

    if (title !== undefined) review.title = String(title);
    if (content !== undefined) review.content = String(content);
    if (rating !== undefined) review.rating = typeof rating === "number" ? rating : review.rating;
    if (visibility !== undefined) review.visibility = String(visibility);

    await review.save();
    return res.status(200).json({ review });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/reviews/:id
 * Auth: supprimer (owner only)
 */
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Not found" });

    if (review.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await review.deleteOne();
    return res.status(204).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
