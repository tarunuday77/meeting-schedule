import type { SendMessageCommandInput } from "@aws-sdk/client-sqs";
export declare const QueueTypes: {
    COMMON_FIFO_QUEUE: {
        url: string;
        isFifoQueue: boolean;
    };
    COMMON_QUEUE: {
        url: string;
        isFifoQueue: boolean;
    };
    BOT_FIFO_QUEUE: {
        url: string;
        isFifoQueue: boolean;
    };
};
export declare const pushToQueue: ({ message, config, type, }: {
    message: any;
    config?: Partial<SendMessageCommandInput>;
    type?: keyof typeof QueueTypes;
}) => Promise<{
    isSuccess: boolean;
    MessageId: string;
} | {
    isSuccess: boolean;
    MessageId?: undefined;
}>;
export declare const pushToQueueBulk: (arr: {
    message: any;
    config?: Partial<SendMessageCommandInput>;
}[], { type, }: {
    type?: keyof typeof QueueTypes;
}) => Promise<void>;
