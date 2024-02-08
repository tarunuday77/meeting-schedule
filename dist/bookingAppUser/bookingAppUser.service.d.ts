import { BookingAppUserDetail } from "src/mongo/meeting/types";
export declare class bookingAppUserService {
    constructor();
    private getFormattedUserInfo;
    addEditCustomField(): Promise<{
        isSuccess: boolean;
        message: string;
    }>;
    getAgentInfoWithRole({ appId, userId, fetchRole, decrypted, isInvited, }: {
        appId: string;
        userId: string;
        fetchRole?: boolean;
        decrypted?: boolean;
        isInvited?: boolean;
    }): Promise<BookingAppUserDetail>;
    createBookingAppUser({ appId, userIds, roleId, status, }: {
        appId: string;
        userIds: string[];
        roleId: string;
        teamIds: string[];
        status?: "ACTIVE" | "INVITED";
    }): Promise<void>;
}
