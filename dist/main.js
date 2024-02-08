"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const validation_filter_1 = require("./filters/validation.filter");
const common_1 = require("@nestjs/common");
const validation_exception_1 = require("./filters/validation.exception");
const on_headers_1 = __importDefault(require("on-headers"));
const verify_1 = __importDefault(require("./libs/jwt/verify"));
const sign_1 = __importDefault(require("./libs/jwt/sign"));
const swagger_1 = require("@nestjs/swagger");
const SessionMiddlewareFn = async (req, res, next) => {
    const isWebsiteApi = req.originalUrl.match(/^\/api\/v1\/chat\/website/)
        ? true
        : false;
    const token = isWebsiteApi
        ? req.headers["x-authorization"] || req.headers["X-Authorization"]
        : req.cookies.__session;
    const decoded = token ? await (0, verify_1.default)(token) : {};
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
    (0, on_headers_1.default)(res, () => {
        const jwt = (0, sign_1.default)(req.session);
        if (isWebsiteApi) {
            res.setHeader("X-Orufy-Auth", jwt);
        }
        else {
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
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
    });
    app.getHttpAdapter().getInstance().disable("x-powered-by");
    app.setGlobalPrefix("/api/v1/chat");
    app.use(function disableCache(_req, res, next) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        next();
    });
    app.use((0, cookie_parser_1.default)());
    app.use(SessionMiddlewareFn);
    await app.useGlobalFilters(new validation_filter_1.ValidationFilter());
    await app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        skipMissingProperties: true,
        exceptionFactory: (errors) => {
            const errMsgs = [];
            const checkError = (errors, parentKey = "") => {
                errors.forEach((err) => {
                    if (err.children?.length) {
                        checkError(err.children, parentKey + err.property + ".");
                    }
                    else {
                        errMsgs.push(`${parentKey + err.property} has wrong value ${err.value}, ${Object.values(err.constraints).join(", ")}`);
                    }
                });
            };
            checkError(errors);
            return new validation_exception_1.ValidationException(errMsgs);
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Chat Apis")
        .setDescription("Chat Apis")
        .setVersion("v1")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api/v1/chat/docs", app, document, {
        swaggerOptions: { defaultModelsExpandDepth: -1 },
    });
    await app.listen(3000, () => {
        console.log("Server started");
    });
}
bootstrap();
//# sourceMappingURL=main.js.map