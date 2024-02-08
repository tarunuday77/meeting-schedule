"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const types_1 = require("../types");
const connection_1 = require("../../connection");
const AddonsSchema = new mongoose_1.Schema({
    key: { type: String, required: true },
    displayName: String,
    type: { type: String },
    status: { type: String, default: "ACTIVE" },
    productId: { type: String, required: true, enum: Object.values(types_1.Product) },
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
    configuration: {
        storageAmount: Number,
        agentCount: Number,
    },
    packageIds: [mongoose_1.Schema.Types.ObjectId],
});
const AddonsModel = connection_1.MONGO_CONNECTION.COMMON.model("Addons", AddonsSchema);
exports.default = AddonsModel;
//# sourceMappingURL=Addons.js.map