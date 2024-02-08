import { Schema } from "mongoose";
import { Package, Product } from "../types";
import { MONGO_CONNECTION } from "src/mongo/connection";

const PackageSchema = new Schema<Package>({
  key: { type: String, required: true },
  productId: { type: String, required: true, enum: Object.values(Product) },
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
      addonId: Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
  features: [{ feature: String, quantity: Number }],
  isDefaultPackage: Boolean,
});

const PackageModel = MONGO_CONNECTION.COMMON.model<Package>(
  "Package",
  PackageSchema,
);

export default PackageModel;
