import mongoose from "mongoose";
if (["dev"].includes(process.env.STAGE)) {
  mongoose.set("debug", true);
}

enum MongoDatabase {
  DEFAULT = "DEFAULT",
  COMMON = "COMMON",
}

export const MONGO_CONNECTION: Record<MongoDatabase, mongoose.Connection> = {
  DEFAULT: mongoose.createConnection(process.env.MONGO_CONNECTION_URI),
  COMMON: mongoose.createConnection(process.env.COMMON_MONGO_CONNECTION_URI),
};
