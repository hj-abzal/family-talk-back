import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard, UserRequestType } from "../auth/jwt-auth.guard";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./create-post.dto";

@Controller('posts')
export class PostsController {

  constructor(private postsService: PostsService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() dto: CreatePostDto, @Req() req: UserRequestType) {
    return this.postsService.create({...dto, user_id: req.user.id});
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllPosts(@Req() req: UserRequestType) {
    return this.postsService.getAll(req.user.id);
  }
}
