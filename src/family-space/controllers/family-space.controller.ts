import { Body, Controller, Post } from "@nestjs/common";
import { FamilySpaceService } from "../services/family-space.service";
import { CreateFamilySpaceDto } from "../dto/create-family-space.dto";

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
}
