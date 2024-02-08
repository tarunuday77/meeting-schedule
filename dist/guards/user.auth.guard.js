"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAuthGuard = exports.validateRoles = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const bookingAppUser_service_1 = require("../bookingAppUser/bookingAppUser.service");
const user_decorator_1 = require("../decorators/user.decorator");
const bookingApp_service_1 = require("../BookingApp.ts/bookingApp.service");
const validateRoles = ({}) => {
    return true;
};
exports.validateRoles = validateRoles;
let AgentAuthGuard = class AgentAuthGuard {
    constructor(reflector, bookingAppUserService, bookingAppService) {
        this.reflector = reflector;
        this.bookingAppUserService = bookingAppUserService;
        this.bookingAppService = bookingAppService;
    }
    async canActivate(context) {
        const permissions = this.reflector.get(user_decorator_1.AGENT_ROLE_PERMISSION_DECORATOR, context.getHandler());
        const request = context.switchToHttp().getRequest();
        const session = request.session;
        const { userId, companyId, chatApp } = session || {};
        let { appId } = chatApp || {};
        let hasPermission = false;
        let statusCode = common_1.HttpStatus.UNAUTHORIZED;
        if (userId && companyId) {
            const [appInfo] = await Promise.all([
                this.bookingAppService.getCompanyBookingApp({
                    appId,
                    companyId,
                }),
            ]);
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
                        hasPermission = (0, exports.validateRoles)({
                            permission: permissions,
                            rolePermission: role.permission,
                        });
                        if (!hasPermission) {
                            statusCode = common_1.HttpStatus.OK;
                        }
                    }
                }
            }
        }
        if (hasPermission) {
            return true;
        }
        throw new common_1.HttpException("Forbidden", statusCode);
    }
};
exports.AgentAuthGuard = AgentAuthGuard;
exports.AgentAuthGuard = AgentAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        bookingAppUser_service_1.bookingAppUserService,
        bookingApp_service_1.bookingAppService])
], AgentAuthGuard);
//# sourceMappingURL=user.auth.guard.js.map