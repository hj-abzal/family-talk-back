import { Controller, Get, Query } from "@nestjs/common";
import { PostsService } from "../posts.service";

@Controller('news')
export class NewsController {

  constructor(private postsService: PostsService) {
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  getAllNews( @Query() query) {
    return this.postsService.getAllInclude(query);
  }
}
