"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connection_1 = require("../../connection");
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String },
    lastName: { type: String },
    emailId: { type: String, required: true },
    emailVerified: { type: Boolean },
    emailVerifiedTstamp: { type: Date },
    countryCode: { type: String },
    mobileNo: { type: String },
    password: { type: String },
    status: { type: String, default: "ACTIVE" },
}, {
    timestamps: true,
    autoIndex: false,
});
const UserModel = connection_1.MONGO_CONNECTION.COMMON.model("User", UserSchema);
exports.default = UserModel;
//# sourceMappingURL=User.js.map