import { Module } from "@nestjs/common";
import { FamilySpaceController } from "./controllers/family-space.controller";
import { FamilySpaceService } from "./services/family-space.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { FamilySpace } from "./models/family-space.model";

@Module({
  controllers: [FamilySpaceController],
  providers: [FamilySpaceService],
  imports: [  SequelizeModule.forFeature([FamilySpace]),]
})
export class FamilySpaceModule {}
