"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connection_1 = require("../../connection");
const Availability_1 = require("./Availability");
const Availability_2 = require("./Availability");
const ScheduleSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    daysType: { type: String },
    daysCount: { type: Number },
    startDate: { type: Number },
    endDate: { type: Number },
});
const EventSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    },
    timeBufferBefore: {
        type: Number,
        required: true,
    },
    timeBufferAfter: {
        type: Number,
        required: true,
    },
    minimumNotice: {
        type: Number,
        required: true,
    },
    dailyLimit: {
        type: Number,
        required: true,
    },
    host: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    schedule: ScheduleSchema,
    timeZone: {
        type: String,
        required: true,
        default: "AUTOMATIC",
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    meta: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    availableHourId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "availableHour",
    },
    position: {
        type: Number,
    },
    customAvailableHour: {
        weekdays: [Availability_1.WeekdayAvailabilitySchema],
        specificDates: [Availability_2.SpecificDateAvailabilitySchema],
    },
}, {
    timestamps: true,
    autoIndex: false,
});
const EventModel = connection_1.MONGO_CONNECTION.DEFAULT.model("Event", EventSchema);
exports.default = EventModel;
//# sourceMappingURL=Event.js.map