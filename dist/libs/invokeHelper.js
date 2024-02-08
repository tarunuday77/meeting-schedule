"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeLambda = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
const util_utf8_node_1 = require("@aws-sdk/util-utf8-node");
const moduleToPort = {
    infra: 3012,
};
const isOffline = process.env.IS_OFFLINE === "true" || process.env.STAGE == "dev";
const LambdaFunctions = {
    inviteUserToCompany: {
        functionName: "orufy-apis-user-" + process.env.STAGE + "-inviteUserToCompany",
    },
    resendInviteToCompany: {
        functionName: "orufy-apis-user-" + process.env.STAGE + "-resendInviteToCompany",
    },
    deleteInvitation: {
        functionName: "orufy-apis-user-" + process.env.STAGE + "-deleteInvitation",
    },
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
const invokeLambda = async ({ data, functionName, invocationType = "RequestResponse", }) => {
    const LambdaFunction = LambdaFunctions[functionName];
    const lambdaOptions = {
        apiVersion: "2015-03-31",
        region: process.env.AWS_REGION,
    };
    if (isOffline) {
        const offlinePort = moduleToPort[LambdaFunction.module] || 3002;
        lambdaOptions.endpoint = "http://localhost:" + offlinePort;
    }
    const client = new client_lambda_1.LambdaClient(lambdaOptions);
    const input = {
        FunctionName: LambdaFunction.functionName,
        InvocationType: invocationType,
        Payload: (0, util_utf8_node_1.fromUtf8)(JSON.stringify(data)),
    };
    const command = new client_lambda_1.InvokeCommand(input);
    const resp = await client.send(command);
    let dataPayload = null;
    if (resp.Payload) {
        const data = (0, util_utf8_node_1.toUtf8)(resp.Payload);
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
exports.invokeLambda = invokeLambda;
//# sourceMappingURL=invokeHelper.js.map