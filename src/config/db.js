import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI); // 👈 TEMP DEBUG

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
