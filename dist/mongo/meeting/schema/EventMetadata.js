"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connection_1 = require("../../connection");
const QuertionSchema = new mongoose_1.Schema({
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
const LinkSchema = new mongoose_1.Schema({
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
const Reminder = new mongoose_1.Schema({
    enable: {
        type: Boolean,
        required: true,
    },
    template: {
        type: String,
        default: null,
    },
});
const EventMetaSchema = new mongoose_1.Schema({
    eventId: { type: mongoose_1.Schema.Types.ObjectId },
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
const EventMetadataModel = connection_1.MONGO_CONNECTION.DEFAULT.model("EventMetadata", EventMetaSchema);
exports.default = EventMetadataModel;
//# sourceMappingURL=EventMetadata.js.map