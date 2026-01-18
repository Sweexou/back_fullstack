import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    movieId: { type: String, required: true, index: true }, // id utilisé dans /movie/:id
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    username: { type: String, required: true, index: true },

    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    rating: { type: Number, min: 0, max: 10 }, // optionnel
    visibility: { type: String, enum: ["public", "unlisted", "private"], default: "public" }, // optionnel (bonus)
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
