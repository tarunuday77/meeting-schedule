import { bookingAppUserService } from "./bookingAppUser.service";
export declare class userController {
    private readonly bookingAppUserService;
    constructor(bookingAppUserService: bookingAppUserService);
    addCustomeField(): Promise<{
        isSuccess: boolean;
        message: string;
    }>;
}
