import { BadRequestException } from "@nestjs/common";
export declare class ValidationException extends BadRequestException {
    validationErros: string[];
    constructor(validationErros: string[]);
}
