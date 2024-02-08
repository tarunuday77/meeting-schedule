import { Module } from "@nestjs/common";
import { bookingAppUserService } from "./bookingAppUser.service";
import { userController } from "./bookingAppUser.controller";

@Module({
  controllers: [userController],
  providers: [bookingAppUserService],
  exports: [bookingAppUserService],
})
export class BookingAppUserModule {}
