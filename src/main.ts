import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import { ValidationFilter } from "./filters/validation.filter";
import { ValidationError, ValidationPipe } from "@nestjs/common";
import { ValidationException } from "./filters/validation.exception";
import { default as onHeaders } from "on-headers";
import verifyJwt from "src/libs/jwt/verify";
import signJwt from "src/libs/jwt/sign";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const SessionMiddlewareFn = async (req, res, next) => {
  const isWebsiteApi = req.originalUrl.match(/^\/api\/v1\/chat\/website/)
    ? true
    : false;
  const token = isWebsiteApi
    ? req.headers["x-authorization"] || req.headers["X-Authorization"]
    : req.cookies.__session;
  const decoded = token ? await verifyJwt(token) : {};
  req.session = decoded;
  req.setSession = (key, value) => {
    if (!key) {
      return;
    }
    if (!value) {
      delete req.session[key];
    }
    req.session[key] = value;
  };

  onHeaders(res, () => {
    const jwt = signJwt(req.session);
    if (isWebsiteApi) {
      res.setHeader("X-Orufy-Auth", jwt);
    } else {
      const cookieDomains = [
        process.env.ORUFY_BASE_DOMAIN.replace(/^https?:\/\/(www\.)?/, ""),
      ];
      if (!["prod"].includes(process.env.STAGE)) {
        cookieDomains.push("orufy.local");
        cookieDomains.push("localhost");
      }
      cookieDomains.forEach((cookieDomain) => {
        res.cookie("__session", jwt, {
          maxAge: 90 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: true,
          domain: cookieDomain,
        });
      });
    }
  });
  next();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.getHttpAdapter().getInstance().disable("x-powered-by");
  app.setGlobalPrefix("/api/v1/chat");

  app.use(function disableCache(_req, res, next) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); //HTTP 1.1
    res.setHeader("Pragma", "no-cache"); //HTTP 1.0
    res.setHeader("Expires", "0"); // Proxies
    next();
  });

  app.use(cookieParser());
  app.use(SessionMiddlewareFn);
  await app.useGlobalFilters(new ValidationFilter());
  await app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errMsgs = [];
        const checkError = (errors, parentKey = "") => {
          errors.forEach((err) => {
            if (err.children?.length) {
              checkError(err.children, parentKey + err.property + ".");
            } else {
              errMsgs.push(
                `${parentKey + err.property} has wrong value ${
                  err.value
                }, ${Object.values(err.constraints).join(", ")}`,
              );
            }
          });
        };
        checkError(errors);
        return new ValidationException(errMsgs);
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle("Chat Apis")
    .setDescription("Chat Apis")
    .setVersion("v1")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/v1/chat/docs", app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
  await app.listen(3000, () => {
    console.log("Server started");
  });
}
bootstrap();
