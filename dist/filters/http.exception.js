"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const axios_1 = __importDefault(require("axios"));
let HttpExceptionFilter = class HttpExceptionFilter extends core_1.BaseExceptionFilter {
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        let status = 500;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
        }
        const url = request.url || "";
        const isHealthCheck = url.includes("health");
        if (isHealthCheck) {
            status = 404;
        }
        if (status >= 500) {
            console.log("EXCEPTION OCCURRED : ", exception);
            let stack = exception.stack;
            if (stack) {
                stack = stack.replace(/\n/gi, "\n");
            }
            if (process.env.NODE_ENV === "production") {
                const html = `\`\`\`
            MESSAGE   : ${exception.message}
            TIME      : ${new Date().toString()}
            URL       : ${url}
            STAGE     : ${process.env.STAGE}
            QUERY     : ${JSON.stringify(request.query)}
            BODY      : ${JSON.stringify(request.body)}
            SESSION   : ${JSON.stringify(request.session)}
            COOKIE    : ${JSON.stringify(request.cookies)}
            USERAGENT : ${request.headers["user-agent"]}
            STACK     : ${stack}
            EXCEPTION : ${JSON.stringify(exception)}
            \`\`\``;
                await axios_1.default.post("https://chat.googleapis.com/v1/spaces/AAAA5yAzh5w/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=smfRWLzU3Mqsx9JSTv2gCPAG4e8n1z0CVT9Flg3O_Ns", {
                    text: html,
                });
            }
            console.log(stack);
        }
        super.catch(exception, host);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http.exception.js.map