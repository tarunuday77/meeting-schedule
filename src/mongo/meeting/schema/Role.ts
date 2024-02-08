import { Schema } from "mongoose";
import { Role, RolePermission } from "../types";
import { MONGO_CONNECTION } from "src/mongo/connection";

const RolePermissionSchema = new Schema<RolePermission>(
  {
    viewAll: Boolean,
    editAll: Boolean,
    deleteAll: Boolean,
  },
  {
    _id: false,
    timestamps: false,
    autoIndex: false,
  }
);

const RoleSchema = new Schema<Role>(
  {
    appId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    permission: { type: RolePermissionSchema, required: true },
    status: { type: String, default: "ACTIVE" },
    isAutoCreated: { type: Boolean, default: false },
    isSuperAdminRole: { type: Boolean, default: false },
    deletedBy: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
    autoIndex: false,
  }
);

const RoleModel = MONGO_CONNECTION.DEFAULT.model<Role>("Role", RoleSchema);

export default RoleModel;
