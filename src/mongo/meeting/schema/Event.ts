import { Schema } from "mongoose";
import { Event } from "../types";
import { MONGO_CONNECTION } from "src/mongo/connection";
import { WeekdayAvailabilitySchema } from "./Availability";
import { SpecificDateAvailabilitySchema } from "./Availability";
const ScheduleSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  daysType: { type: String },
  daysCount: { type: Number },
  startDate: { type: Number },
  endDate: { type: Number },
});

const EventSchema = new Schema<Event>(
  {
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
        type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
    },
    availableHourId: {
      type: Schema.Types.ObjectId,
      ref: "availableHour",
    },
    position: {
      type: Number,
    },
    customAvailableHour: {
      weekdays: [WeekdayAvailabilitySchema],
      specificDates: [SpecificDateAvailabilitySchema],
    },
  },
  {
    timestamps: true,
    autoIndex: false,
  }
);

const EventModel = MONGO_CONNECTION.DEFAULT.model<Event>("Event", EventSchema);

export default EventModel;
