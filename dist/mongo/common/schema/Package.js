"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const types_1 = require("../types");
const connection_1 = require("../../connection");
const PackageSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    productId: { type: String, required: true, enum: Object.values(types_1.Product) },
    displayName: String,
    status: { type: String, default: "ACTIVE" },
    price: {
        annual: {
            inr: Number,
            usd: Number,
        },
        monthly: {
            inr: Number,
            usd: Number,
        },
    },
    addons: [
        {
            addonId: mongoose_1.Schema.Types.ObjectId,
            quantity: Number,
        },
    ],
    features: [{ feature: String, quantity: Number }],
    isDefaultPackage: Boolean,
});
const PackageModel = connection_1.MONGO_CONNECTION.COMMON.model("Package", PackageSchema);
exports.default = PackageModel;
//# sourceMappingURL=Package.js.map