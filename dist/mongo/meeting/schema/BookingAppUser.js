"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connection_1 = require("../../connection");
const BookingAppUserSchema = new mongoose_1.Schema({
    appId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId },
    profilePic: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    designation: { type: String },
    roleId: { type: mongoose_1.Schema.Types.ObjectId },
    status: { type: String, required: true, default: "ACTIVE" },
    onlineStatus: { type: String, required: true, default: "ONLINE" },
    lastSeenAt: { type: Date },
    acitivityMode: { type: String, required: true, default: "MANUAL" },
    invitedAt: { type: Date, default: Date.now },
    timeZone: {
        type: String,
    },
    theme: {
        type: String,
        default: "LIGHT",
    },
    timeFormat: {
        type: String,
        default: "TWELVE",
    },
});
const BookingAppUserModel = connection_1.MONGO_CONNECTION.DEFAULT.model("BookingAppUser", BookingAppUserSchema);
exports.default = BookingAppUserModel;
//# sourceMappingURL=BookingAppUser.js.map