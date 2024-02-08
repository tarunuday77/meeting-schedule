import { ArrayMinSize, IsArray, IsString } from "class-validator";

export class SendAgentInviteDTO {
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  emailIds: string[];

  @IsString()
  roleId: string;
}
