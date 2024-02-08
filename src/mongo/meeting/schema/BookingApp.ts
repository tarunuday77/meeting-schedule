import { Schema } from "mongoose";
import { BookingApp } from "../types";
import { MONGO_CONNECTION } from "src/mongo/connection";

const BookingAppSchema = new Schema<BookingApp>(
  {
    companyId: { type: Schema.Types.ObjectId, required: true },
    companyProductId: { type: Schema.Types.ObjectId, required: true },
    companyLogo: { type: String },
    companyName: { type: String, required: true },
    companyUrl: { type: String },
    status: { type: String, default: "ACTIVE" },
    encryption: {
      algorithm: String,
      initVector: String,
      securitykey: String,
    },
    storageUsed: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    autoIndex: false,
  }
);

const BookingAppModel = MONGO_CONNECTION.DEFAULT.model<BookingApp>(
  "BookingApp",
  BookingAppSchema
);

export default BookingAppModel;
