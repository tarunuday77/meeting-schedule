"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connection_1 = require("../../connection");
const BookingAppSchema = new mongoose_1.Schema({
    companyId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    companyProductId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
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
}, {
    timestamps: true,
    autoIndex: false,
});
const BookingAppModel = connection_1.MONGO_CONNECTION.DEFAULT.model("BookingApp", BookingAppSchema);
exports.default = BookingAppModel;
//# sourceMappingURL=BookingApp.js.map