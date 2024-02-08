import {
  LambdaClient,
  InvokeCommand,
  InvocationType,
} from "@aws-sdk/client-lambda";
import { fromUtf8, toUtf8 } from "@aws-sdk/util-utf8-node";

const moduleToPort = {
  infra: 3012,
};

const isOffline =
  process.env.IS_OFFLINE === "true" || process.env.STAGE == "dev";
interface LambdaDef {
  functionName: string;
  module?: keyof typeof moduleToPort;
}

const LambdaFunctions: Record<string, LambdaDef> = {
  inviteUserToCompany: {
    functionName:
      "orufy-apis-user-" + process.env.STAGE + "-inviteUserToCompany",
  },
  resendInviteToCompany: {
    functionName:
      "orufy-apis-user-" + process.env.STAGE + "-resendInviteToCompany",
  },
  deleteInvitation: {
    functionName: "orufy-apis-user-" + process.env.STAGE + "-deleteInvitation",
  },
  // convertFileToAnotherFormat: {
  //   functionName:
  //     "chat-apis-infra-" + process.env.STAGE + "-convertFileToAnotherFormat",
  //   module: "infra",
  // },
  // getAudioVideoDuration: {
  //   functionName:
  //     "chat-apis-infra-" + process.env.STAGE + "-getAudioVideoDuration",
  //   module: "infra",
  // },
  botFlowHandler: {
    functionName: "chat-apis-" + process.env.STAGE + "-botFlowHandler",
  },
  awayMessageHandler: {
    functionName: "chat-apis-" + process.env.STAGE + "-awayMessageHandler",
  },
  sendNotification: {
    functionName: "chat-apis-" + process.env.STAGE + "-sendNotification",
  },
};

export const invokeLambda = async ({
  data,
  functionName,
  invocationType = "RequestResponse",
}: {
  data: Record<any, any>;
  functionName: keyof typeof LambdaFunctions;
  invocationType?: InvocationType;
}): Promise<any> => {
  const LambdaFunction = LambdaFunctions[functionName];
  const lambdaOptions: any = {
    apiVersion: "2015-03-31",
    region: process.env.AWS_REGION,
  };
  if (isOffline) {
    const offlinePort = moduleToPort[LambdaFunction.module] || 3002;
    lambdaOptions.endpoint = "http://localhost:" + offlinePort;
  }
  const client = new LambdaClient(lambdaOptions);
  const input = {
    FunctionName: LambdaFunction.functionName,
    InvocationType: invocationType,
    Payload: fromUtf8(JSON.stringify(data)),
  };

  const command = new InvokeCommand(input);

  const resp = await client.send(command);

  let dataPayload = null;
  if (resp.Payload) {
    const data = toUtf8(resp.Payload);
    if (data) {
      dataPayload = JSON.parse(data);
    }
  }

  if (resp.FunctionError) {
    console.log(dataPayload);
    throw dataPayload;
  }
  return dataPayload;
};
