import { BookingApp } from "src/mongo/meeting/types";
export declare class bookingAppService {
    constructor();
    addEditCustomField(): Promise<{
        isSuccess: boolean;
        message: string;
    }>;
    getCompanyBookingApp({ appId, companyId, }: {
        appId?: string;
        companyId: string;
    }): Promise<BookingApp>;
}
