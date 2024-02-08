import { RolePermission } from "src/mongo/meeting/types";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { bookingAppUserService } from "src/bookingAppUser/bookingAppUser.service";
// import { ChatAppService } from "src/chat-app/chat-app.service";
import {
  AGENT_ROLE_PERMISSION_DECORATOR,
  //   IGNORE_EXPIRED_PLAN,
  //   SET_ONLINE_STATUS,
} from "src/decorators/user.decorator";
import { bookingAppService } from "src/BookingApp.ts/bookingApp.service";

export type ApiPermission =
  | "MANAGE_TEAMS"
  | "MANAGE_ROLES"
  | "MANAGE_QUICK_REPLIES"
  | "MANAGE_COMPANY_INFORMATION"
  | "MANAGE_USERS"
  | "MANAGE_WEB_WIDGET"
  | "MANAGE_FACEBOOK_MESSENGER"
  | "MANAGE_INSTAGRAM"
  | "MANAGE_TELEGRAM"
  | "MANAGE_LINE"
  | "MANAGE_BILLING"
  | "MANAGE_TAGS"
  | "MANAGE_CHATGPT"
  | "MANAGE_AUTO_RESOLVE"
  | "MANAGE_BUSINESS_HOURS"
  | "MANAGE_FAQ"
  | "MANAGE_TICKETS"
  | "MANAGE_PLUGINS"
  | "MANAGE_BOT"
  | "MANAGE_WHATSAPP"
  | "MANAGE_CUSTOM_FIELDS"
  | "MANAGE_IP_BLOCKING"
  | "MANAGE_BUSINESS"
  | "MANAGE_WEBHOOK"
  | "MANAGE_FILTER"
  | "MANAGE_CHAT_APP_FILES";

export const validateRoles = (
  {
    //   permission,
    //   rolePermission,
  }: {
    permission: ApiPermission[];
    rolePermission: RolePermission;
  }
) => {
  return true;
};
@Injectable()
export class AgentAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly bookingAppUserService: bookingAppUserService,
    private readonly bookingAppService: bookingAppService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>(
      AGENT_ROLE_PERMISSION_DECORATOR,
      context.getHandler()
    );
    // const ignoreExpiredPlan = this.reflector.get<boolean>(
    //   IGNORE_EXPIRED_PLAN,
    //   context.getHandler(),
    // );

    const request = context.switchToHttp().getRequest();
    const session = request.session;
    const { userId, companyId, chatApp } = session || {};
    let { appId } = chatApp || {};
    let hasPermission = false;
    let statusCode = HttpStatus.UNAUTHORIZED;
    if (userId && companyId) {
      const [appInfo] = await Promise.all([
        // this.userService.getCurrentPlan(companyId),
        this.bookingAppService.getCompanyBookingApp({
          appId,
          companyId,
        }),
      ]);
      //   request.companyPlan = plan;
      //   if (!ignoreExpiredPlan && plan.isExpired && !plan.isInGracePeriod) {
      //     throw new HttpException(
      //       { isSuccess: false, error: "Expired" },
      //       HttpStatus.OK,
      //     );
      //   }
      if (appInfo) {
        appId = appInfo?._id?.toString();
        session.chatApp = {
          appId,
        };
        const userInfo = await this.bookingAppUserService.getAgentInfoWithRole({
          appId,
          userId,
          fetchRole: true,
          decrypted: true,
        });
        if (userInfo) {
          const role = userInfo.role;
          request.userInfo = userInfo;
          request.appInfo = appInfo;
          hasPermission = true;
          if (!role.isSuperAdminRole && permissions?.length) {
            hasPermission = validateRoles({
              permission: permissions as any[],
              rolePermission: role.permission,
            });
            if (!hasPermission) {
              statusCode = HttpStatus.OK;
            }
          }
        }
      }
    }
    if (hasPermission) {
      return true;
    }
    throw new HttpException("Forbidden", statusCode);
  }
}
