import { Schema } from "mongoose";
import { Company } from "../types";
import { MONGO_CONNECTION } from "src/mongo/connection";
import UserModel from "./User";

const CompanySchema = new Schema<Company>(
  {
    companyName: { type: String, required: true },
    companyLogo: { type: String },
    primaryUserId: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
      required: true,
    },
    status: { type: String, default: "ACTIVE" },
  },
  {
    timestamps: true,
    autoIndex: false,
  },
);

const CompanyModel = MONGO_CONNECTION.COMMON.model<Company>(
  "Company",
  CompanySchema,
);

export default CompanyModel;
