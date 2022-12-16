import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard, UserRequestType } from "../../auth/jwt-auth.guard";
import { PostsService } from "../posts.service";
import { CreatePostDto } from "../create-post.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Posts } from "../posts.model";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) {
  }

  @ApiOperation({summary: 'Create posts'})
  @ApiResponse({status: 200, type: Posts, description: JSON.stringify({addedPost: "Post"})})
  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() dto: CreatePostDto, @Req() req: UserRequestType) {
    return this.postsService.create({...dto, user_id: req.user.id});
  }

  @ApiOperation({summary: 'Get your posts'})
  @ApiResponse({status: 200, type: Posts, description: JSON.stringify({currenPage: 1, totalCount: 30, posts:  "Post"})})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllPosts(@Req() req: UserRequestType, @Query() query) {
    return this.postsService.getAll(req.user.id, query);
  }
}
