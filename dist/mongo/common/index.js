"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelList = void 0;
const User_1 = __importDefault(require("./schema/User"));
const Company_1 = __importDefault(require("./schema/Company"));
const CompanyProduct_1 = __importDefault(require("./schema/CompanyProduct"));
const CompanyUserPermission_1 = __importDefault(require("./schema/CompanyUserPermission"));
exports.ModelList = {
    User: User_1.default,
    Company: Company_1.default,
    CompanyProduct: CompanyProduct_1.default,
    CompanyUserPermission: CompanyUserPermission_1.default,
};
//# sourceMappingURL=index.js.map