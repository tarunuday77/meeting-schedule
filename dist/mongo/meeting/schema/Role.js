"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connection_1 = require("../../connection");
const RolePermissionSchema = new mongoose_1.Schema({
    viewAll: Boolean,
    editAll: Boolean,
    deleteAll: Boolean,
}, {
    _id: false,
    timestamps: false,
    autoIndex: false,
});
const RoleSchema = new mongoose_1.Schema({
    appId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    permission: { type: RolePermissionSchema, required: true },
    status: { type: String, default: "ACTIVE" },
    isAutoCreated: { type: Boolean, default: false },
    isSuperAdminRole: { type: Boolean, default: false },
    deletedBy: { type: mongoose_1.Schema.Types.ObjectId },
}, {
    timestamps: true,
    autoIndex: false,
});
const RoleModel = connection_1.MONGO_CONNECTION.DEFAULT.model("Role", RoleSchema);
exports.default = RoleModel;
//# sourceMappingURL=Role.js.map