import { Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import axios from "axios";

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  async catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    let status = 500;
    if (exception instanceof HttpException) {
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
        await axios.post(
          "https://chat.googleapis.com/v1/spaces/AAAA5yAzh5w/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=smfRWLzU3Mqsx9JSTv2gCPAG4e8n1z0CVT9Flg3O_Ns",
          {
            text: html,
          },
        );
      }
      console.log(stack);
    }

    super.catch(exception, host);
  }
}
