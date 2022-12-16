import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { FamilySpaceService } from "../services/family-space.service";
import { CreateFamilySpaceDto } from "../dto/create-family-space.dto";
import { JwtAuthGuard, UserRequestType } from "../../auth/jwt-auth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FamilySpace } from "../models/family-space.model";

@ApiTags("Family space")
@Controller("family-space")
export class FamilySpaceController {

  constructor(
    private familySpaceService: FamilySpaceService
  ) {

  }


  @ApiOperation({ summary: "Create family space" })
  @ApiResponse({ status: 200, type: FamilySpace })
  @Post("")
  createSpace(@Body() dto: CreateFamilySpaceDto) {
    return this.familySpaceService.create(dto);
  }

  @ApiOperation({ summary: "get family space with members" })
  @ApiResponse({ status: 200, type: FamilySpace })
  @UseGuards(JwtAuthGuard)
  @Get("")
  getSpace(@Req() req: UserRequestType) {
    return this.familySpaceService.getById(req.user.family_space_id);
  }
}
