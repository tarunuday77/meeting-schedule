"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgnoreExpiredPlan = exports.IGNORE_EXPIRED_PLAN = exports.SetAgentOnlineStatus = exports.SET_ONLINE_STATUS = exports.SetAllowedRoles = exports.AGENT_ROLE_PERMISSION_DECORATOR = void 0;
const common_1 = require("@nestjs/common");
exports.AGENT_ROLE_PERMISSION_DECORATOR = "AGENT_ROLE_PERMISSION_DECORATOR";
const SetAllowedRoles = (...roles) => (0, common_1.SetMetadata)(exports.AGENT_ROLE_PERMISSION_DECORATOR, roles);
exports.SetAllowedRoles = SetAllowedRoles;
exports.SET_ONLINE_STATUS = "SET_ONLINE_STATUS";
const SetAgentOnlineStatus = () => (0, common_1.SetMetadata)(exports.SET_ONLINE_STATUS, true);
exports.SetAgentOnlineStatus = SetAgentOnlineStatus;
exports.IGNORE_EXPIRED_PLAN = "IGNORE_EXPIRED_PLAN";
const IgnoreExpiredPlan = () => (0, common_1.SetMetadata)(exports.IGNORE_EXPIRED_PLAN, true);
exports.IgnoreExpiredPlan = IgnoreExpiredPlan;
//# sourceMappingURL=user.decorator.js.map