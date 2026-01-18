import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Movie from "../models/Movie.js";
import { fetchPopularMovies } from "../services/tmdb.service.js";

dotenv.config();
await connectDB();

const importMovies = async () => {
  try {
    for (let page = 1; page <= 10; page++) {
      console.log(`📥 Fetching page ${page}...`);
      const movies = await fetchPopularMovies(page);

      for (const movie of movies) {
        await Movie.updateOne(
          { tmdbId: movie.id },
          {
            tmdbId: movie.id,
            title: movie.title,
            overview: movie.overview,
            posterPath: movie.poster_path,
            backdropPath: movie.backdrop_path,
            releaseDate: movie.release_date,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
            popularity: movie.popularity,
            genres: []
          },
          { upsert: true }
        );
      }
    }

    console.log("✅ Movies imported successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Import error:", error);
    process.exit(1);
  }
};

importMovies();
