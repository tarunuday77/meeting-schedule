"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingDetailSchema = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("../types");
const connection_1 = require("../../connection");
const Company_1 = __importDefault(require("./Company"));
exports.BillingDetailSchema = new mongoose_1.Schema({
    name: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    postalCode: { type: String },
    taxNumber: { type: String },
}, {
    _id: false,
});
const CurrentPlanAddonSchema = new mongoose_1.Schema({
    addonId: mongoose_1.Schema.Types.ObjectId,
    quantity: Number,
    type: String,
}, {
    timestamps: true,
    autoIndex: false,
});
const CurrentPlanSchema = new mongoose_1.Schema({
    packageId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    packagePrice: Number,
    addons: [CurrentPlanAddonSchema],
    billingFrequency: {
        type: String,
        enum: Object.values(types_1.BillingFrequency),
    },
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    billingDetails: exports.BillingDetailSchema,
    paymentGateway: String,
    currencyCode: { type: String, enum: ["INR", "USD"] },
    isRecurring: Boolean,
    subscriptionId: String,
    totalAmount: { type: Number, required: true },
    isTrialPlan: Boolean,
    isStopped: Boolean,
}, {
    timestamps: true,
    autoIndex: false,
});
const CompanyProductSchema = new mongoose_1.Schema({
    companyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: Company_1.default,
        required: true,
    },
    productId: { type: String },
    status: { type: String, default: "ACTIVE" },
    currentPlan: CurrentPlanSchema,
}, {
    timestamps: true,
    autoIndex: false,
});
const CompanyProductModel = connection_1.MONGO_CONNECTION.COMMON.model("CompanyProduct", CompanyProductSchema);
exports.default = CompanyProductModel;
//# sourceMappingURL=CompanyProduct.js.map