import { RolePermission } from "src/mongo/meeting/types";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { bookingAppUserService } from "src/bookingAppUser/bookingAppUser.service";
import { bookingAppService } from "src/BookingApp.ts/bookingApp.service";
export type ApiPermission = "MANAGE_TEAMS" | "MANAGE_ROLES" | "MANAGE_QUICK_REPLIES" | "MANAGE_COMPANY_INFORMATION" | "MANAGE_USERS" | "MANAGE_WEB_WIDGET" | "MANAGE_FACEBOOK_MESSENGER" | "MANAGE_INSTAGRAM" | "MANAGE_TELEGRAM" | "MANAGE_LINE" | "MANAGE_BILLING" | "MANAGE_TAGS" | "MANAGE_CHATGPT" | "MANAGE_AUTO_RESOLVE" | "MANAGE_BUSINESS_HOURS" | "MANAGE_FAQ" | "MANAGE_TICKETS" | "MANAGE_PLUGINS" | "MANAGE_BOT" | "MANAGE_WHATSAPP" | "MANAGE_CUSTOM_FIELDS" | "MANAGE_IP_BLOCKING" | "MANAGE_BUSINESS" | "MANAGE_WEBHOOK" | "MANAGE_FILTER" | "MANAGE_CHAT_APP_FILES";
export declare const validateRoles: ({}: {
    permission: ApiPermission[];
    rolePermission: RolePermission;
}) => boolean;
export declare class AgentAuthGuard implements CanActivate {
    private reflector;
    private readonly bookingAppUserService;
    private readonly bookingAppService;
    constructor(reflector: Reflector, bookingAppUserService: bookingAppUserService, bookingAppService: bookingAppService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
