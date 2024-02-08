"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.decryptUsingKeyIv = exports.encryptUsingKeyIv = void 0;
const crypto = __importStar(require("node:crypto"));
const algorithm = "aes256";
const key = Buffer.from(process.env.ORUFY_ENCRYPTION_KEY || "");
const iv = Buffer.from(process.env.ORUFY_ENCRYPTION_IV || "");
const encryptUsingKeyIv = (text, { key, iv, }) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    return cipher.update(text, "utf8", "base64") + cipher.final("base64");
};
exports.encryptUsingKeyIv = encryptUsingKeyIv;
const decryptUsingKeyIv = (encryptedText, { key, iv, }) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    return (decipher.update(encryptedText, "base64", "utf8") + decipher.final("utf8"));
};
exports.decryptUsingKeyIv = decryptUsingKeyIv;
const encrypt = (text) => {
    return (0, exports.encryptUsingKeyIv)(text, { key, iv });
};
exports.encrypt = encrypt;
const decrypt = (encryptedText) => {
    return (0, exports.decryptUsingKeyIv)(encryptedText, { key, iv });
};
exports.decrypt = decrypt;
//# sourceMappingURL=index.js.map