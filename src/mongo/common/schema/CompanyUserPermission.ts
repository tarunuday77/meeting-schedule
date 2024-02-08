import { Schema } from "mongoose";
import { CompanyUserPermission } from "../types";
import { MONGO_CONNECTION } from "src/mongo/connection";
import UserModel from "./User";
import CompanyModel from "./Company";

const CompanyUserPermissionSchema = new Schema<CompanyUserPermission>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: CompanyModel,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: UserModel, required: true },
    products: { type: [String] },
    role: { type: String },
    status: { type: String, default: "ACTIVE" },
  },
  {
    timestamps: true,
    autoIndex: false,
  },
);

const CompanyUserPermissionModel =
  MONGO_CONNECTION.COMMON.model<CompanyUserPermission>(
    "CompanyUserPermission",
    CompanyUserPermissionSchema,
  );

export default CompanyUserPermissionModel;
