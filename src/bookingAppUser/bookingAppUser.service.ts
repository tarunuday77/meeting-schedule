import { Injectable } from "@nestjs/common";
import UserModel from "src/mongo/common/schema/User";
import { User } from "src/mongo/common/types";
import BookingAppUserModel from "src/mongo/meeting/schema/BookingAppUser";
import RoleModel from "src/mongo/meeting/schema/Role";
import { BookingAppUser, BookingAppUserDetail } from "src/mongo/meeting/types";
import { decrypt } from "src/libs/crypto";
// import { SendAgentInviteDTO } from "./dto/invite.dto";
// import CustomFieldModel from "@mongo/chat/schema/CustomeField";

// import { CustomField } from "@mongo/chat/types";

@Injectable()
export class bookingAppUserService {
  constructor() {}

  private getFormattedUserInfo({
    adminInfo,
    agentInfo,
    decrypted = false,
  }: {
    adminInfo: User;
    agentInfo: BookingAppUser;
    decrypted?: boolean;
  }) {
    let firstName = adminInfo.firstName;
    let lastName = adminInfo.lastName;
    if (agentInfo.firstName || agentInfo.lastName) {
      firstName = agentInfo.firstName;
      lastName = agentInfo.lastName;
    }
    return {
      userId: agentInfo.userId,
      emailId:
        decrypted && adminInfo.emailId
          ? decrypt(adminInfo.emailId)
          : adminInfo.emailId,
      mobileNo:
        decrypted && adminInfo.mobileNo
          ? decrypt(adminInfo.mobileNo)
          : adminInfo.mobileNo,
      countryCode: adminInfo.countryCode,
      firstName,
      lastName,
      name: [firstName, lastName].filter(Boolean).join(" "),
      roleId: agentInfo.roleId,
      // teamIds: agentInfo.teams?.map((cur) => cur.teamId.toString()),
      profilePic: agentInfo.profilePic,
      // settings: agentInfo.settings,
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

  async getAgentInfoWithRole({
    appId,
    userId,
    fetchRole = false,
    decrypted = false,
    isInvited = false,
  }: {
    appId: string;
    userId: string;
    fetchRole?: boolean;
    decrypted?: boolean;
    isInvited?: boolean;
  }) {
    const [adminInfo, agentInfo] = await Promise.all([
      UserModel.findOne(
        {
          _id: userId,
          status: isInvited
            ? {
                $in: ["ACTIVE", "UNVERIFIED"],
              }
            : "ACTIVE",
        },
        {
          emailId: 1,
          firstName: 1,
          lastName: 1,
          mobileNo: 1,
          countryCode: 1,
        }
      ).lean(),
      BookingAppUserModel.findOne(
        {
          appId,
          userId,
          status: isInvited ? "INVITED" : "ACTIVE",
        },
        {
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
        }
      ).lean(),
    ]);
    if (!adminInfo || !agentInfo) {
      return null;
    }
    const userDet: BookingAppUserDetail = this.getFormattedUserInfo({
      adminInfo,
      agentInfo,
      decrypted,
    });
    if (fetchRole && agentInfo.roleId) {
      const role = await RoleModel.findOne(
        {
          appId,
          _id: agentInfo.roleId,
        },
        {
          name: 1,
          permission: 1,
          isSuperAdminRole: 1,
        }
      ).lean();
      userDet.role = role;
    }

    return userDet;
  }

  async createBookingAppUser({
    appId,
    userIds,
    roleId,
    // teamIds = [],
    status = "ACTIVE",
  }: {
    appId: string;
    userIds: string[];
    roleId: string;
    teamIds: string[];
    status?: "ACTIVE" | "INVITED";
  }) {
    const agents = userIds.map((userId) => {
      const agent: BookingAppUser = {
        appId: appId as any,
        roleId: roleId as any,
        userId: userId as any,
        status,
        // teams: teamIds.map((teamId) => ({
        //   teamId: teamId as any,
        // })),
        invitedAt: new Date(),
      };
      return agent;
    });
    await BookingAppUserModel.insertMany(agents);
  }

  // async sendInviteToAgents(
  //   {
  //     appId,
  //     companyId,
  //     userId,
  //   }: {
  //     appId: string;
  //     companyId: string;
  //     userId: string;
  //   },
  //   options: SendAgentInviteDTO
  // ) {
  //   const { emailIds, roleId } = options;
  //   const encryptedEmailIds = emailIds.map((cur) => encrypt(cur));

  //   const users = await UserModel.find(
  //     {
  //       emailId: {
  //         $in: encryptedEmailIds,
  //       },
  //     },
  //     {
  //       _id: 1,
  //     }
  //   ).lean();
  //   const existingUserIds = users.map((cur) => cur._id);
  //   const agent = await BookingAppUserModel.findOne(
  //     {
  //       appId,
  //       userId: {
  //         $in: existingUserIds,
  //       },
  //       status: "ACTIVE",
  //     },
  //     {
  //       _id: 1,
  //     }
  //   ).lean();
  //   if (agent) {
  //     return {
  //       isSuccess: false,
  //       error: "USER_ALREDAY_EXISTS",
  //     };
  //   }

  //   const [roleObj, teamId] = await Promise.all([
  //     this.roleService.getRoleByIds({
  //       roleIds: [roleId],
  //       appId,
  //     }),
  //     this.teamService.getDefaultTeamId({ appId }),
  //   ]);

  //   if (!roleObj[roleId] || !teamId) {
  //     return {
  //       isSuccess: false,
  //     };
  //   }
  //   const data = await invokeLambda({
  //     data: {
  //       emailIds,
  //       products: ["CHAT_APP"],
  //       companyId,
  //       userId,
  //     },
  //     functionName: "inviteUserToCompany",
  //   });
  //   if (!data?.isSuccess || !data.invitedList?.length) {
  //     return {
  //       isSuccess: false,
  //     };
  //   }
  //   const invitedList = data.invitedList;
  //   const invitedUserIds: string[] = invitedList.map((cur) => cur.userId);
  //   const agents = await BookingAppUserModel.find(
  //     {
  //       appId,
  //       userId: {
  //         $in: invitedUserIds,
  //       },
  //     },
  //     {
  //       userId: 1,
  //       status: 1,
  //     }
  //   ).lean();
  //   const existingAgents = agents.map((cur) => cur.userId.toString());
  //   const remainingAgents = invitedUserIds.filter(
  //     (cur) => !existingAgents.includes(cur)
  //   );
  //   await BookingAppUserModel.updateOne(
  //     {
  //       appId,
  //       userId: {
  //         $in: existingAgents,
  //       },
  //       status: {
  //         $ne: "ACTIVE",
  //       },
  //     },
  //     {
  //       $set: {
  //         roleId,
  //         status: "INVITED",
  //         teams: [
  //           {
  //             teamId,
  //           },
  //         ],
  //         invitedAt: new Date(),
  //       },
  //     }
  //   );
  //   await this.createBookingAppUser({
  //     appId,
  //     roleId,
  //     userIds: remainingAgents,
  //     status: "INVITED",
  //     teamIds: [teamId],
  //   });
  //   return {
  //     isSuccess: true,
  //     invitedList: invitedList.map((cur) => cur.emailId),
  //   };
  // }
}
