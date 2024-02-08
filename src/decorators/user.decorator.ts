import { SetMetadata } from "@nestjs/common";

export const AGENT_ROLE_PERMISSION_DECORATOR =
  "AGENT_ROLE_PERMISSION_DECORATOR";
export const SetAllowedRoles = (...roles: string[]) =>
  SetMetadata(AGENT_ROLE_PERMISSION_DECORATOR, roles);

export const SET_ONLINE_STATUS = "SET_ONLINE_STATUS";
export const SetAgentOnlineStatus = () => SetMetadata(SET_ONLINE_STATUS, true);

export const IGNORE_EXPIRED_PLAN = "IGNORE_EXPIRED_PLAN";
export const IgnoreExpiredPlan = () => SetMetadata(IGNORE_EXPIRED_PLAN, true);
