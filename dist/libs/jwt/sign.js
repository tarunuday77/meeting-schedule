"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sign_1 = __importDefault(require("jsonwebtoken/sign"));
const SESSION_JWT_SECRET = process.env.SESSION_JWT_SECRET;
const signJwt = (data, options = {}) => {
    const { expiresIn } = options;
    return (0, sign_1.default)({
        data,
    }, SESSION_JWT_SECRET, { expiresIn: expiresIn || 90 * 24 * 60 * 60 });
};
exports.default = signJwt;
//# sourceMappingURL=sign.js.map