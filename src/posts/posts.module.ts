import { forwardRef, Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./controllers/posts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Posts } from "./posts.model";
import { AuthModule } from "../auth/auth.module";
import { NewsController } from "./controllers/news.controller";
import { User } from "../auth/models/users.model";

@Module({
  providers: [PostsService],
  controllers: [PostsController, NewsController],
  imports: [
    SequelizeModule.forFeature([Posts, User]),
    forwardRef(() => AuthModule),
  ]
})
export class PostsModule {}
