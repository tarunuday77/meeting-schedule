import { InvocationType } from "@aws-sdk/client-lambda";
declare const moduleToPort: {
    infra: number;
};
interface LambdaDef {
    functionName: string;
    module?: keyof typeof moduleToPort;
}
declare const LambdaFunctions: Record<string, LambdaDef>;
export declare const invokeLambda: ({ data, functionName, invocationType, }: {
    data: Record<any, any>;
    functionName: keyof typeof LambdaFunctions;
    invocationType?: InvocationType;
}) => Promise<any>;
export {};
