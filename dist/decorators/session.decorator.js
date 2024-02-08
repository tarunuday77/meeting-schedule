"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetSession = exports.GetFeatureDetail = exports.GetCompanyPlan = exports.GetAgentInfo = exports.GetSession = void 0;
const common_1 = require("@nestjs/common");
exports.GetSession = (0, common_1.createParamDecorator)((key, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (key == "appId") {
        return request.session?.chatApp?.appId;
    }
    if (key == "widgetId") {
        return request.session?.chatApp?.widgetId;
    }
    return request.session && request.session[key];
});
exports.GetAgentInfo = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.userInfo;
});
exports.GetCompanyPlan = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.companyPlan;
});
exports.GetFeatureDetail = (0, common_1.createParamDecorator)((key, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.companyPlan?.featureObj?.[key];
});
exports.SetSession = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return (key, value) => {
        if (typeof value === "undefined") {
            delete request.session[key];
        }
        else {
            request.session[key] = value;
        }
    };
});
//# sourceMappingURL=session.decorator.js.map