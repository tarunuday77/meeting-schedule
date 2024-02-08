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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
export declare const ModelList: {
    Event: import("mongoose").Model<import("./types").Event, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./types").Event> & import("./types").Event & Required<{
        _id: string;
    }>, any>;
    EventMetadata: import("mongoose").Model<import("./types").EventMetadata, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./types").EventMetadata> & import("./types").EventMetadata & {
        _id: import("mongoose").Types.ObjectId;
    }, any>;
    User: import("mongoose").Model<import("./types").BookingAppUser, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./types").BookingAppUser> & import("./types").BookingAppUser & Required<{
        _id: string;
    }>, any>;
    Availability: import("mongoose").Model<import("./types").Availability, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./types").Availability> & import("./types").Availability & {
        _id: import("mongoose").Types.ObjectId;
    }, any>;
    BookingApp: import("mongoose").Model<import("./types").BookingApp, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./types").BookingApp> & import("./types").BookingApp & Required<{
        _id: string;
    }>, any>;
    Role: import("mongoose").Model<import("./types").Role, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./types").Role> & import("./types").Role & Required<{
        _id: string;
    }>, any>;
};
export type ModelListType = typeof ModelList;
