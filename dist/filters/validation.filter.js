"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationFilter = void 0;
const common_1 = require("@nestjs/common");
const validation_exception_1 = require("./validation.exception");
let ValidationFilter = class ValidationFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp(), response = ctx.getResponse();
        return response.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            isSuccess: false,
            validationErrors: exception.validationErros,
            message: exception.validationErros?.[0],
        });
    }
};
exports.ValidationFilter = ValidationFilter;
exports.ValidationFilter = ValidationFilter = __decorate([
    (0, common_1.Catch)(validation_exception_1.ValidationException)
], ValidationFilter);
//# sourceMappingURL=validation.filter.js.map