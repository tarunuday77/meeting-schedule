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
    User: import("mongoose").Model<import("./types").User, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./types").User> & import("./types").User & Required<{
        _id: string;
    }>, any>;
    Company: import("mongoose").Model<import("./types").Company, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./types").Company> & import("./types").Company & {
        _id: import("mongoose").Types.ObjectId;
    }, any>;
    CompanyProduct: import("mongoose").Model<import("./types").CompanyProduct, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./types").CompanyProduct> & import("./types").CompanyProduct & Required<{
        _id: string;
    }>, any>;
    CompanyUserPermission: import("mongoose").Model<import("./types").CompanyUserPermission, {}, {}, {}, import("mongoose").Document<unknown, {}, import("./types").CompanyUserPermission> & import("./types").CompanyUserPermission & {
        _id: import("mongoose").Types.ObjectId;
    }, any>;
};
export type ModelListType = typeof ModelList;
