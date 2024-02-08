import Event from "./schema/Event";
import Availability from "./schema/Availability";
import User from "./schema/BookingAppUser";
import EventMetadata from "./schema/EventMetadata";
import BookingApp from "./schema/BookingApp";
import Role from "./schema/Role";

export const ModelList = {
  Event,
  EventMetadata,
  User,
  Availability,
  BookingApp,
  Role,
};

export type ModelListType = typeof ModelList;
