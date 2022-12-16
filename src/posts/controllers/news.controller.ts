import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { PostsService } from "../posts.service";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";

@Controller('news')
export class NewsController {

  constructor(private postsService: PostsService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllNews( @Query() query, @Req() req) {
    return this.postsService.getAllInclude(query, req.user.family_space_id);
  }
}
