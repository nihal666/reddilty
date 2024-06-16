import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/redditly"
  );

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;