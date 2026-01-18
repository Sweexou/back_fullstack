import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    tmdbId: { type: Number, unique: true },
    title: String,
    overview: String,
    posterPath: String,
    backdropPath: String,
    releaseDate: String,
    voteAverage: Number,
    voteCount: Number,
    popularity: Number,
    genres: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
