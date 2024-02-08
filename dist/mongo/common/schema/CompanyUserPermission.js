"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connection_1 = require("../../connection");
const User_1 = __importDefault(require("./User"));
const Company_1 = __importDefault(require("./Company"));
const CompanyUserPermissionSchema = new mongoose_1.Schema({
    companyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: Company_1.default,
        required: true,
    },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: User_1.default, required: true },
    products: { type: [String] },
    role: { type: String },
    status: { type: String, default: "ACTIVE" },
}, {
    timestamps: true,
    autoIndex: false,
});
const CompanyUserPermissionModel = connection_1.MONGO_CONNECTION.COMMON.model("CompanyUserPermission", CompanyUserPermissionSchema);
exports.default = CompanyUserPermissionModel;
//# sourceMappingURL=CompanyUserPermission.js.map