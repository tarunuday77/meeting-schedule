"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelList = void 0;
const Event_1 = __importDefault(require("./schema/Event"));
const Availability_1 = __importDefault(require("./schema/Availability"));
const BookingAppUser_1 = __importDefault(require("./schema/BookingAppUser"));
const EventMetadata_1 = __importDefault(require("./schema/EventMetadata"));
const BookingApp_1 = __importDefault(require("./schema/BookingApp"));
const Role_1 = __importDefault(require("./schema/Role"));
exports.ModelList = {
    Event: Event_1.default,
    EventMetadata: EventMetadata_1.default,
    User: BookingAppUser_1.default,
    Availability: Availability_1.default,
    BookingApp: BookingApp_1.default,
    Role: Role_1.default,
};
//# sourceMappingURL=index.js.map