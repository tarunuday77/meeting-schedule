/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema } from "mongoose";
import { Availability } from "../types";
export declare const WeekdayAvailabilitySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    day: string;
    hours: import("mongoose").Types.DocumentArray<{
        end: string;
        start: string;
    }>;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    day: string;
    hours: import("mongoose").Types.DocumentArray<{
        end: string;
        start: string;
    }>;
}>> & import("mongoose").FlatRecord<{
    day: string;
    hours: import("mongoose").Types.DocumentArray<{
        end: string;
        start: string;
    }>;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const SpecificDateAvailabilitySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    date: string;
    hours: import("mongoose").Types.DocumentArray<{
        end: string;
        start: string;
    }>;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    date: string;
    hours: import("mongoose").Types.DocumentArray<{
        end: string;
        start: string;
    }>;
}>> & import("mongoose").FlatRecord<{
    date: string;
    hours: import("mongoose").Types.DocumentArray<{
        end: string;
        start: string;
    }>;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const AvailabilitySchema: Schema<Availability, import("mongoose").Model<Availability, any, any, any, import("mongoose").Document<unknown, any, Availability> & Availability & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Availability, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Availability>> & import("mongoose").FlatRecord<Availability> & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare const AvailabilityModel: import("mongoose").Model<Availability, {}, {}, {}, import("mongoose").Document<unknown, {}, Availability> & Availability & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
export default AvailabilityModel;
