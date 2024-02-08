"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushToQueueBulk = exports.pushToQueue = exports.QueueTypes = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const uuid_1 = require("uuid");
const client = new client_sqs_1.SQSClient({});
exports.QueueTypes = {
    COMMON_FIFO_QUEUE: {
        url: process.env.CHAT_COMMON_FIFO_QUEUE_URL,
        isFifoQueue: true,
    },
    COMMON_QUEUE: {
        url: process.env.CHAT_COMMON_QUEUE_URL,
        isFifoQueue: false,
    },
    BOT_FIFO_QUEUE: {
        url: process.env.BOT_FIFO_QUEUE_URL,
        isFifoQueue: true,
    },
};
const pushToQueue = async ({ message, config, type = "COMMON_QUEUE", }) => {
    const options = {
        QueueUrl: exports.QueueTypes[type].url,
        MessageBody: JSON.stringify(message),
    };
    if (exports.QueueTypes[type].isFifoQueue) {
        options.MessageDeduplicationId =
            config?.MessageDeduplicationId || Date.now() + "";
        options.MessageGroupId = config.MessageGroupId;
    }
    else {
        if (config?.DelaySeconds) {
            options.DelaySeconds = config.DelaySeconds;
        }
    }
    try {
        const resp = await client.send(new client_sqs_1.SendMessageCommand(options));
        return {
            isSuccess: true,
            MessageId: resp.MessageId,
        };
    }
    catch (e) {
        console.log(e);
        return {
            isSuccess: false,
        };
    }
};
exports.pushToQueue = pushToQueue;
const pushToQueueBulk = async (arr, { type = "COMMON_QUEUE", }) => {
    if (!arr.length) {
        return;
    }
    for (let i = 0; i < arr.length; i += 10) {
        const chunk = arr.slice(i, i + 10);
        const options = {
            QueueUrl: exports.QueueTypes[type].url,
            Entries: [],
        };
        for (const { message, config } of chunk) {
            const entry = {
                Id: (0, uuid_1.v4)(),
                MessageBody: JSON.stringify(message),
            };
            if (exports.QueueTypes[type].isFifoQueue) {
                entry.MessageDeduplicationId =
                    config?.MessageDeduplicationId || Date.now() + "";
                entry.MessageGroupId = config.MessageGroupId;
            }
            else {
                if (config?.DelaySeconds) {
                    entry.DelaySeconds = config.DelaySeconds;
                }
            }
            options.Entries.push(entry);
        }
        try {
            await client.send(new client_sqs_1.SendMessageBatchCommand(options));
        }
        catch (e) {
            console.log(e);
        }
    }
};
exports.pushToQueueBulk = pushToQueueBulk;
//# sourceMappingURL=pushToQueue.js.map