import { bookingAppService } from "./bookingApp.service";
export declare class bookingAppController {
    private readonly bookingAppService;
    constructor(bookingAppService: bookingAppService);
    addCustomeField(): Promise<{
        isSuccess: boolean;
        message: string;
    }>;
}
