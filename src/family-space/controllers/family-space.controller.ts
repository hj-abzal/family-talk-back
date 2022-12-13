import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { FamilySpaceService } from "../services/family-space.service";
import { CreateFamilySpaceDto } from "../dto/create-family-space.dto";
import { JwtAuthGuard, UserRequestType } from "../../auth/jwt-auth.guard";

@Controller('family-space')
export class FamilySpaceController {

  constructor(
    private familySpaceService: FamilySpaceService
  ) {

  }


  @Post("")
  createSpace(@Body() dto: CreateFamilySpaceDto) {
    return this.familySpaceService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("")
  getSpace(@Req() req: UserRequestType) {
    return this.familySpaceService.getById(req.user.family_space_id);
  }
}
