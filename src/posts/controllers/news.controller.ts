import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { PostsService } from "../posts.service";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";

@Controller('news')
export class NewsController {

  constructor(private postsService: PostsService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllNews( @Query() query) {
    return this.postsService.getAllInclude(query);
  }
}
