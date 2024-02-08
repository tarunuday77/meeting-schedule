import { ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
export declare class HttpExceptionFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost): Promise<void>;
}