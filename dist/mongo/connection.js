"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_CONNECTION = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
if (["dev"].includes(process.env.STAGE)) {
    mongoose_1.default.set("debug", true);
}
var MongoDatabase;
(function (MongoDatabase) {
    MongoDatabase["DEFAULT"] = "DEFAULT";
    MongoDatabase["COMMON"] = "COMMON";
})(MongoDatabase || (MongoDatabase = {}));
exports.MONGO_CONNECTION = {
    DEFAULT: mongoose_1.default.createConnection(process.env.MONGO_CONNECTION_URI),
    COMMON: mongoose_1.default.createConnection(process.env.COMMON_MONGO_CONNECTION_URI),
};
//# sourceMappingURL=connection.js.map