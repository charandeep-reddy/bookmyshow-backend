import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bookmyshow";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) return cached.conn;

    cached.conn = await mongoose.connect(MONGODB_URI, {
        dbName: "bookmyshow",
    });

  return cached.conn;
}

export default dbConnect;