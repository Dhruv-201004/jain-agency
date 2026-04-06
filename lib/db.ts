import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache || { conn: null, promise: null };

global.mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("Please define the MONGODB_URI environment variable.");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, {
      bufferCommands: false,
      dbName: process.env.MONGODB_DB_NAME || "jain_agency",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
