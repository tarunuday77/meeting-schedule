import {
  SQSClient,
  SendMessageBatchCommand,
  SendMessageCommand,
} from "@aws-sdk/client-sqs";
import type {
  SendMessageBatchCommandInput,
  SendMessageBatchRequestEntry,
  SendMessageCommandInput,
} from "@aws-sdk/client-sqs";
import { v4 as uuidv4 } from "uuid";

const client = new SQSClient({});

export const QueueTypes = {
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

export const pushToQueue = async ({
  message,
  config,
  type = "COMMON_QUEUE",
}: {
  message: any;
  config?: Partial<SendMessageCommandInput>;
  type?: keyof typeof QueueTypes;
}) => {
  const options: SendMessageCommandInput = {
    QueueUrl: QueueTypes[type].url,
    MessageBody: JSON.stringify(message),
  };
  if (QueueTypes[type].isFifoQueue) {
    options.MessageDeduplicationId =
      config?.MessageDeduplicationId || Date.now() + "";
    options.MessageGroupId = config.MessageGroupId;
  } else {
    if (config?.DelaySeconds) {
      options.DelaySeconds = config.DelaySeconds;
    }
  }
  try {
    const resp = await client.send(new SendMessageCommand(options));
    return {
      isSuccess: true,
      MessageId: resp.MessageId,
    };
  } catch (e) {
    console.log(e);
    return {
      isSuccess: false,
    };
  }
};

export const pushToQueueBulk = async (
  arr: { message: any; config?: Partial<SendMessageCommandInput> }[],
  {
    type = "COMMON_QUEUE",
  }: {
    type?: keyof typeof QueueTypes;
  },
) => {
  if (!arr.length) {
    return;
  }
  for (let i = 0; i < arr.length; i += 10) {
    const chunk = arr.slice(i, i + 10);
    const options: SendMessageBatchCommandInput = {
      QueueUrl: QueueTypes[type].url,
      Entries: [],
    };
    for (const { message, config } of chunk) {
      const entry: SendMessageBatchRequestEntry = {
        Id: uuidv4(),
        MessageBody: JSON.stringify(message),
      };
      if (QueueTypes[type].isFifoQueue) {
        entry.MessageDeduplicationId =
          config?.MessageDeduplicationId || Date.now() + "";
        entry.MessageGroupId = config.MessageGroupId;
      } else {
        if (config?.DelaySeconds) {
          entry.DelaySeconds = config.DelaySeconds;
        }
      }
      options.Entries.push(entry);
    }
    try {
      await client.send(new SendMessageBatchCommand(options));
    } catch (e) {
      console.log(e);
    }
  }
};
