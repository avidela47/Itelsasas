// /config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB || "itelsa";

  if (!uri) {
    console.error("❌ MONGO_URI no está definido en .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { dbName });
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error de conexión MongoDB:", err.message);
    process.exit(1);
  }
};
