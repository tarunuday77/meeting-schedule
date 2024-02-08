import { Controller, Get } from "@nestjs/common";
// import { AgentAuthGuard } from "src/guards/agent.auth.guard";
// import { GetSession } from "src/decorators/session.decorator";
// import { SetAllowedRoles } from "src/decorators/agent.decorator";
// import { PackageGuard } from "src/guards/package.guard";
import { bookingAppService } from "./bookingApp.service";
// import {
//   AddCustomFieldDTO,
//   DeleteCustomFieldDTO,
//   EditCustomFieldDTO,
//   ManageCustomFieldDTO,
//   SortCustomFieldDTO,
// } from "./dto/custom-field.dto";

// @UseGuards(PackageGuard)
// @UseGuards(AgentAuthGuard)
@Controller("/bookingApp")
export class bookingAppController {
  constructor(private readonly bookingAppService: bookingAppService) {}

  //   @SetAllowedRoles("MANAGE_CUSTOMER_FIELDS")
  @Get("test")
  addCustomeField() { // @Body() addEditCustomeField: AddCustomFieldDTO, // @GetSession("userId") userId: string, // @GetSession("appId") appId: string,
    return this.bookingAppService.addEditCustomField();
  }

  // @Post("/invite/send")
  // sendInviteToAgents(
  //   @GetSession("appId") appId: string,
  //   @GetSession("userId") userId: string,
  //   @GetSession("companyId") companyId: string,
  //   @Body() sendAgentInviteDto: SendAgentInviteDTO,
  // ) {
  //   return this.testService.sendInviteToAgents(
  //     { appId, userId, companyId },
  //     sendAgentInviteDto,
  //   );
  // }
}
