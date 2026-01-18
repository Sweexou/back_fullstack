import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

/**
 * GET /api/movies
 * Query params:
 *  - page (default 1)
 *  - limit (default 20)
 *  - search (optional)
 *
 * TMDB-compatible response
 */
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = req.query.search || "";

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const movies = await Movie.find(query)
      .sort({ popularity: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Movie.countDocuments(query);

    res.json({
      page,
      results: movies.map((movie) => ({
        id: movie.tmdbId,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.posterPath,
        backdrop_path: movie.backdropPath,
        release_date: movie.releaseDate,
        vote_average: movie.voteAverage,
        vote_count: movie.voteCount,
        popularity: movie.popularity
      })),
      total_results: total,
      total_pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error("❌ Error fetching movies:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/movies/:id
 * TMDB-compatible movie detail
 */
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findOne({ tmdbId: req.params.id });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({
      id: movie.tmdbId,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.posterPath,
      backdrop_path: movie.backdropPath,
      release_date: movie.releaseDate,
      vote_average: movie.voteAverage,
      vote_count: movie.voteCount,
      popularity: movie.popularity
    });
  } catch (error) {
    console.error("❌ Error fetching movie:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
