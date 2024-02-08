import { Schema } from "mongoose";
import { EventMetadata } from "../types";
import { MONGO_CONNECTION } from "src/mongo/connection";

const QuertionSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  enable: {
    type: Boolean,
    required: true,
  },
});

const LinkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  enable: {
    type: Boolean,
    required: true,
  },
});

const Reminder = new Schema({
  enable: {
    type: Boolean,
    required: true,
  },
  template: {
    type: String,
    default: null,
  },
});

const EventMetaSchema = new Schema<EventMetadata>({
  eventId: { type: Schema.Types.ObjectId },
  allowGuests: {
    type: Boolean,
    required: true,
  },
  autoFill: {
    type: Boolean,
    required: true,
  },
  afterEventRedirect: {
    type: String,
    default: null,
  },
  invite: {
    type: String,
    required: true,
  },
  followUp: Reminder,
  emailReminder: Reminder,
  questions: [QuertionSchema],
  links: [LinkSchema],
});

const EventMetadataModel = MONGO_CONNECTION.DEFAULT.model<EventMetadata>(
  "EventMetadata",
  EventMetaSchema
);

export default EventMetadataModel;
