"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verify_1 = __importDefault(require("jsonwebtoken/verify"));
const SESSION_JWT_SECRET = process.env.SESSION_JWT_SECRET;
const verifyJwt = (token) => {
    return new Promise((resolve) => {
        if (!token) {
            return resolve(null);
        }
        (0, verify_1.default)(token, SESSION_JWT_SECRET, function (_err, decoded) {
            resolve(decoded?.data || null);
        });
    });
};
exports.default = verifyJwt;
//# sourceMappingURL=verify.js.map