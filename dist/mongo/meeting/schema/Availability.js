"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilitySchema = exports.SpecificDateAvailabilitySchema = exports.WeekdayAvailabilitySchema = void 0;
const mongoose_1 = require("mongoose");
const connection_1 = require("../../connection");
const HourSchema = new mongoose_1.Schema({
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
});
exports.WeekdayAvailabilitySchema = new mongoose_1.Schema({
    day: {
        type: String,
        required: true,
    },
    hours: [HourSchema],
});
exports.SpecificDateAvailabilitySchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
    },
    hours: [HourSchema],
});
exports.AvailabilitySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    enabled: {
        type: Boolean,
        required: true,
    },
    appId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "app",
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    weekdays: [exports.WeekdayAvailabilitySchema],
    specificDates: [exports.SpecificDateAvailabilitySchema],
});
const AvailabilityModel = connection_1.MONGO_CONNECTION.DEFAULT.model("Availability", exports.AvailabilitySchema);
exports.default = AvailabilityModel;
//# sourceMappingURL=Availability.js.map