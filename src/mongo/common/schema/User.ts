import { Schema } from "mongoose";
import { User } from "../types";
import { MONGO_CONNECTION } from "src/mongo/connection";

const UserSchema = new Schema<User>(
  {
    firstName: { type: String },
    lastName: { type: String },
    emailId: { type: String, required: true },
    emailVerified: { type: Boolean },
    emailVerifiedTstamp: { type: Date },
    countryCode: { type: String },
    mobileNo: { type: String },
    password: { type: String },
    status: { type: String, default: "ACTIVE" },
  },
  {
    timestamps: true,
    autoIndex: false,
  }
);

const UserModel = MONGO_CONNECTION.COMMON.model<User>("User", UserSchema);

export default UserModel;
