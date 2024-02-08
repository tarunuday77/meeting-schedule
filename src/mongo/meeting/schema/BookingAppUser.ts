import { Schema } from "mongoose";
import { MONGO_CONNECTION } from "src/mongo/connection";
import { BookingAppUser } from "../types";

const BookingAppUserSchema = new Schema<BookingAppUser>({
  appId: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId },
  profilePic: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  designation: { type: String },
  // notificationIds: { type: [AgentNotificationSchema] },
  // teams: [AgentTeamSchema],
  roleId: { type: Schema.Types.ObjectId },
  // settings: { type: AgentSettingSchema },
  status: { type: String, required: true, default: "ACTIVE" },
  onlineStatus: { type: String, required: true, default: "ONLINE" },
  lastSeenAt: { type: Date },
  acitivityMode: { type: String, required: true, default: "MANUAL" },
  invitedAt: { type: Date, default: Date.now },

  timeZone: {
    type: String,
  },
  theme: {
    type: String,
    default: "LIGHT",
  },
  timeFormat: {
    type: String,
    default: "TWELVE",
  },
});

const BookingAppUserModel = MONGO_CONNECTION.DEFAULT.model<BookingAppUser>(
  "BookingAppUser",
  BookingAppUserSchema
);
export default BookingAppUserModel;
