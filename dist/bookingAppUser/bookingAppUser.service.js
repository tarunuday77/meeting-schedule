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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingAppUserService = void 0;
const common_1 = require("@nestjs/common");
const User_1 = __importDefault(require("../mongo/common/schema/User"));
const BookingAppUser_1 = __importDefault(require("../mongo/meeting/schema/BookingAppUser"));
const Role_1 = __importDefault(require("../mongo/meeting/schema/Role"));
const crypto_1 = require("../libs/crypto");
let bookingAppUserService = class bookingAppUserService {
    constructor() { }
    getFormattedUserInfo({ adminInfo, agentInfo, decrypted = false, }) {
        let firstName = adminInfo.firstName;
        let lastName = adminInfo.lastName;
        if (agentInfo.firstName || agentInfo.lastName) {
            firstName = agentInfo.firstName;
            lastName = agentInfo.lastName;
        }
        return {
            userId: agentInfo.userId,
            emailId: decrypted && adminInfo.emailId
                ? (0, crypto_1.decrypt)(adminInfo.emailId)
                : adminInfo.emailId,
            mobileNo: decrypted && adminInfo.mobileNo
                ? (0, crypto_1.decrypt)(adminInfo.mobileNo)
                : adminInfo.mobileNo,
            countryCode: adminInfo.countryCode,
            firstName,
            lastName,
            name: [firstName, lastName].filter(Boolean).join(" "),
            roleId: agentInfo.roleId,
            profilePic: agentInfo.profilePic,
            designation: agentInfo.designation,
            status: agentInfo.status,
            onlineStatus: agentInfo.onlineStatus,
            invitedAt: agentInfo.invitedAt,
            lastSeenAt: agentInfo.lastSeenAt,
            timeZone: agentInfo.timeZone,
        };
    }
    async addEditCustomField() {
        return {
            isSuccess: false,
            message: "NAME_OR_LABEL_ALREADY_EXISTS",
        };
    }
    async getAgentInfoWithRole({ appId, userId, fetchRole = false, decrypted = false, isInvited = false, }) {
        const [adminInfo, agentInfo] = await Promise.all([
            User_1.default.findOne({
                _id: userId,
                status: isInvited
                    ? {
                        $in: ["ACTIVE", "UNVERIFIED"],
                    }
                    : "ACTIVE",
            }, {
                emailId: 1,
                firstName: 1,
                lastName: 1,
                mobileNo: 1,
                countryCode: 1,
            }).lean(),
            BookingAppUser_1.default.findOne({
                appId,
                userId,
                status: isInvited ? "INVITED" : "ACTIVE",
            }, {
                _id: 0,
                userId: 1,
                profilePic: 1,
                firstName: 1,
                lastName: 1,
                roleId: 1,
                designation: 1,
                teams: 1,
                settings: 1,
                status: 1,
                onlineStatus: 1,
                lastSeenAt: 1,
            }).lean(),
        ]);
        if (!adminInfo || !agentInfo) {
            return null;
        }
        const userDet = this.getFormattedUserInfo({
            adminInfo,
            agentInfo,
            decrypted,
        });
        if (fetchRole && agentInfo.roleId) {
            const role = await Role_1.default.findOne({
                appId,
                _id: agentInfo.roleId,
            }, {
                name: 1,
                permission: 1,
                isSuperAdminRole: 1,
            }).lean();
            userDet.role = role;
        }
        return userDet;
    }
    async createBookingAppUser({ appId, userIds, roleId, status = "ACTIVE", }) {
        const agents = userIds.map((userId) => {
            const agent = {
                appId: appId,
                roleId: roleId,
                userId: userId,
                status,
                invitedAt: new Date(),
            };
            return agent;
        });
        await BookingAppUser_1.default.insertMany(agents);
    }
};
exports.bookingAppUserService = bookingAppUserService;
exports.bookingAppUserService = bookingAppUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], bookingAppUserService);
//# sourceMappingURL=bookingAppUser.service.js.map