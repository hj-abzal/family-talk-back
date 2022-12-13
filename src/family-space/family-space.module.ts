import { forwardRef, Module } from "@nestjs/common";
import { FamilySpaceController } from "./controllers/family-space.controller";
import { FamilySpaceService } from "./services/family-space.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { FamilySpace } from "./models/family-space.model";
import { User } from "../auth/models/users.model";
import { Posts } from "../posts/posts.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [FamilySpaceController],
  providers: [FamilySpaceService],
  imports: [
    SequelizeModule.forFeature([FamilySpace, User, Posts]),
    forwardRef(() => AuthModule),
  ]
})
export class FamilySpaceModule {
}
