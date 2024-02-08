"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = void 0;
const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const randomString = (length = 10) => {
    let result = "";
    for (let i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};
exports.randomString = randomString;
//# sourceMappingURL=random.js.map