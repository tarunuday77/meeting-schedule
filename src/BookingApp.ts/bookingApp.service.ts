import { Injectable } from "@nestjs/common";
import { ProjectionType } from "mongoose";
import BookingAppModel from "src/mongo/meeting/schema/BookingApp";
import { BookingApp } from "src/mongo/meeting/types";
// import CustomFieldModel from "@mongo/chat/schema/CustomeField";

// import { CustomField } from "@mongo/chat/types";

@Injectable()
export class bookingAppService {
  constructor() {}

  async addEditCustomField() {
    return {
      isSuccess: false,
      message: "NAME_OR_LABEL_ALREADY_EXISTS",
    };
  }

  async getCompanyBookingApp({
    appId,
    companyId,
  }: {
    appId?: string;
    companyId: string;
  }) {
    let chatAppInfo: BookingApp;
    const projection: ProjectionType<BookingApp> = {
      companyName: 1,
      companyUrl: 1,
      companyLogo: 1,
    };
    if (appId) {
      chatAppInfo = await BookingAppModel.findOne(
        {
          _id: appId,
          companyId,
          status: "ACTIVE",
        },
        projection
      ).lean();
    }
    if (!chatAppInfo) {
      chatAppInfo = await BookingAppModel.findOne(
        {
          companyId,
          status: "ACTIVE",
        },
        projection
      ).lean();
    }
    return chatAppInfo;
  }
}
