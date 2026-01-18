import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import moviesRoutes from "./routes/movies.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { requireAuth } from "./middlewares/auth.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import usersRoutes from "./routes/users.routes.js";





const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/movies", moviesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/users", usersRoutes);



const PORT = process.env.PORT || 4000;

app.get("/api/me", requireAuth, (req, res) => {
  res.status(200).json({ user: req.user });
});


app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});
