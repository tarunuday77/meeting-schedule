import { BookingAppUser } from "src/mongo/meeting/types";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetSession = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (key == "appId") {
      return request.session?.chatApp?.appId;
    }
    if (key == "widgetId") {
      return request.session?.chatApp?.widgetId;
    }
    return request.session && request.session[key];
  }
);

export const GetAgentInfo = createParamDecorator(
  (_, ctx: ExecutionContext): BookingAppUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.userInfo;
  }
);

export const GetCompanyPlan = createParamDecorator(
  (_, ctx: ExecutionContext): BookingAppUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.companyPlan;
  }
);

export const GetFeatureDetail = createParamDecorator(
  (key, ctx: ExecutionContext): BookingAppUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.companyPlan?.featureObj?.[key];
  }
);

export const SetSession = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return (key: string, value: any) => {
    if (typeof value === "undefined") {
      delete request.session[key];
    } else {
      request.session[key] = value;
    }
  };
});
