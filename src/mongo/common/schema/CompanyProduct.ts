import { Schema } from "mongoose";
import {
  BiilingDetail,
  CompanyProduct,
  CurrentPlan,
  CurrentPlanAddon,
  BillingFrequency,
} from "../types";
import { MONGO_CONNECTION } from "src/mongo/connection";
import CompanyModel from "./Company";

export const BillingDetailSchema = new Schema<BiilingDetail>(
  {
    name: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    postalCode: { type: String },
    taxNumber: { type: String },
  },
  {
    _id: false,
  },
);

const CurrentPlanAddonSchema = new Schema<CurrentPlanAddon>(
  {
    addonId: Schema.Types.ObjectId,
    quantity: Number,
    type: String,
  },
  {
    timestamps: true,
    autoIndex: false,
  },
);

const CurrentPlanSchema = new Schema<CurrentPlan>(
  {
    packageId: { type: Schema.Types.ObjectId, required: true },
    packagePrice: Number,
    addons: [CurrentPlanAddonSchema],
    billingFrequency: {
      type: String,
      enum: Object.values(BillingFrequency),
    },
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    billingDetails: BillingDetailSchema,
    paymentGateway: String,
    currencyCode: { type: String, enum: ["INR", "USD"] },
    isRecurring: Boolean,
    subscriptionId: String,
    totalAmount: { type: Number, required: true },
    isTrialPlan: Boolean,
    isStopped: Boolean,
  },
  {
    timestamps: true,
    autoIndex: false,
  },
);
const CompanyProductSchema = new Schema<CompanyProduct>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: CompanyModel,
      required: true,
    },
    productId: { type: String },
    status: { type: String, default: "ACTIVE" },
    currentPlan: CurrentPlanSchema,
  },
  {
    timestamps: true,
    autoIndex: false,
  },
);

const CompanyProductModel = MONGO_CONNECTION.COMMON.model<CompanyProduct>(
  "CompanyProduct",
  CompanyProductSchema,
);

export default CompanyProductModel;
