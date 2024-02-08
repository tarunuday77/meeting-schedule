import { Schema } from "mongoose";
import { Availability } from "../types";
import { MONGO_CONNECTION } from "src/mongo/connection";

const HourSchema = new Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

export const WeekdayAvailabilitySchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  hours: [HourSchema],
});

export const SpecificDateAvailabilitySchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  hours: [HourSchema],
});

export const AvailabilitySchema = new Schema<Availability>({
  name: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    required: true,
  },
  appId: {
    type: Schema.Types.ObjectId,
    ref: "app",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  weekdays: [WeekdayAvailabilitySchema],
  specificDates: [SpecificDateAvailabilitySchema],
});

const AvailabilityModel = MONGO_CONNECTION.DEFAULT.model<Availability>(
  "Availability",
  AvailabilitySchema
);

export default AvailabilityModel;
