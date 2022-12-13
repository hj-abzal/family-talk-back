import { Module } from "@nestjs/common";
import { FamilySpaceController } from "./controllers/family-space.controller";
import { FamilySpaceService } from "./services/family-space.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { FamilySpace } from "./models/family-space.model";
import { User } from "../auth/models/users.model";
import { Posts } from "../posts/posts.model";

@Module({
  controllers: [FamilySpaceController],
  providers: [FamilySpaceService],
  imports: [SequelizeModule.forFeature([FamilySpace, User, Posts])]
})
export class FamilySpaceModule {
}
