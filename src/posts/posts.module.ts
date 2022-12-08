import { forwardRef, Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Posts } from "./posts.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([Posts]),
    forwardRef(() => AuthModule),
  ]
})
export class PostsModule {}
