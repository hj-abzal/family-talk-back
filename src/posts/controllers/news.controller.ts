import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { PostsService } from "../posts.service";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Posts } from "../posts.model";

@ApiTags('News')
@Controller('news')
export class NewsController {

  constructor(private postsService: PostsService) {
  }

  @ApiOperation({summary: 'Get news of your family'})
  @ApiResponse({status: 200, type: Posts, description: JSON.stringify({currenPage: 1, totalCount: 30, news:  "Post"})})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllNews( @Query() query, @Req() req) {
    return this.postsService.getAllInclude(query, req.user.family_space_id);
  }
}
