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
import type { Schema } from "mongoose";
export interface Event {
    _id?: string;
    appId: Schema.Types.ObjectId;
    name: string;
    type?: "SOLO" | "GROUP" | "COLLECTIVE" | "ROUND_ROBIN";
    mode: "ZOOM" | "GOOGLE_MEET" | "MICROSOFT_TEAMS" | "IN_PERSON";
    locationConfiguration?: {
        type: string;
        location: string;
        phone: string;
    }[];
    description?: string;
    duration?: number;
    timeZone: "LOCK" | "AUTOMATIC";
    weekday: string[];
    schedule: {
        type: "UPCOMING_DAYS" | "DATE_RANGE" | "ENDLESS";
        daysType: "CALENDAR_DAYS" | "WEEKDAYS";
        daysCount: number;
        startDate: string;
        endDate: string;
    };
    host: Schema.Types.ObjectId[];
    timeBufferBefore: number;
    slug: string;
    meta?: Schema.Types.ObjectId;
    position?: number;
    availableHourId?: Schema.Types.ObjectId;
    customAvailableHour?: {
        weekdays: WeekdayAvailability[];
        specificDates: SpecificDateAvailability[];
    };
    timeBufferAfter: number;
    minimumNotice?: number;
    invitiesLimit: number;
    dailyLimit?: number;
}
export interface Availability {
    name: string;
    enabled: boolean;
    appId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    weekdays: WeekdayAvailability[];
    specificDates: SpecificDateAvailability[];
}
export interface WeekdayAvailability {
    day: string;
    hours: HourAvailability[];
}
export interface SpecificDateAvailability {
    date: string;
    hours: HourAvailability[];
}
export interface HourAvailability {
    start: string;
    end: string;
}
export interface Reminder {
    enable: boolean;
    template?: string | null;
}
export interface Question {
    content: string;
    required: boolean;
    type: "ONE_LINE" | "MULTI_LINE" | "RADIO" | "CHECKBOX" | "DROPDOWN" | "PHONE_NUMBER";
    enable: boolean;
}
export interface Link {
    name: string;
    url: string;
    enable: boolean;
}
export interface EventMetadata {
    eventId?: Schema.Types.ObjectId;
    allowGuests: boolean;
    autoFill: boolean;
    afterEventRedirect?: string | null;
    invite: "CALENDAR" | "EMAIL";
    followUp: Reminder;
    emailReminder: Reminder;
    questions: Question[];
    links: Link[];
}
export interface BookingAppUser {
    _id?: string;
    appId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    profilePic?: string;
    firstName?: string;
    lastName?: string;
    designation?: string;
    roleId: Schema.Types.ObjectId;
    status: "INVITED" | "ACTIVE" | "DELETED" | "INACTIVE";
    onlineStatus?: "ONLINE" | "OFFLINE";
    lastSeenAt?: Date;
    acitivityMode?: "AUTOMATIC" | "MANUAL";
    invitedAt?: Date;
    timeZone?: string;
    theme?: "DARK" | "LIGHT";
    timeFormat?: "TWELVE" | "TWENTY_FOUR";
}
export interface Role {
    _id?: string;
    appId: Schema.Types.ObjectId;
    name: string;
    permission: RolePermission;
    status: "ACTIVE" | "DELETED" | "INACTIVE";
    isAutoCreated: boolean;
    deletedBy?: Schema.Types.ObjectId;
    isSuperAdminRole?: boolean;
}
export interface RolePermission {
    viewAll?: boolean;
    editAll?: boolean;
    deleteAll?: boolean;
}
export interface BookingApp {
    _id?: string;
    companyId: Schema.Types.ObjectId;
    companyProductId: Schema.Types.ObjectId;
    status: "ACTIVE" | "INACTIVE" | "DELETED";
    companyLogo: string;
    companyName: string;
    companyUrl: string;
    encryption: {
        algorithm: "aes256";
        initVector: string;
        securitykey: string;
    };
    storageUsed: number;
}
export interface BookingAppUserDetail extends Omit<BookingAppUser, "appId"> {
    emailId: string;
    mobileNo: string;
    countryCode: string;
    role?: Role;
    teamIds?: string[];
    name: string;
}
