"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connection_1 = require("../../connection");
const User_1 = __importDefault(require("./User"));
const CompanySchema = new mongoose_1.Schema({
    companyName: { type: String, required: true },
    companyLogo: { type: String },
    primaryUserId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: User_1.default,
        required: true,
    },
    status: { type: String, default: "ACTIVE" },
}, {
    timestamps: true,
    autoIndex: false,
});
const CompanyModel = connection_1.MONGO_CONNECTION.COMMON.model("Company", CompanySchema);
exports.default = CompanyModel;
//# sourceMappingURL=Company.js.map