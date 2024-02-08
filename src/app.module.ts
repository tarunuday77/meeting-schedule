import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";

import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./filters/http.exception";

import { AppService } from "./app.service";
import { BookingAppUserModule } from "./bookingAppUser/bookingAppUser.module";
import { BookingAppModule } from "./BookingApp.ts/bookingApp.module";

@Module({
  imports: [ConfigModule.forRoot(), BookingAppUserModule, BookingAppModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
