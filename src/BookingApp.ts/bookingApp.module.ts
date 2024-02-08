import { Module } from "@nestjs/common";
import { bookingAppService } from "./bookingApp.service";
import { bookingAppController } from "./bookingApp.controller";

@Module({
  controllers: [bookingAppController],
  providers: [bookingAppService],
  exports: [bookingAppService],
})
export class BookingAppModule {}
