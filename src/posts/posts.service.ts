import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Posts } from "./posts.model";
import { CreatePostDto } from "./create-post.dto";
import { User } from "../auth/models/users.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts) private postsRepository: typeof Posts
  ) {
  }

  async create(dto: CreatePostDto): Promise<Posts> {
    return await this.postsRepository.create(dto);
  }

  async getAll(user_id: number): Promise<Posts[]> {
    return this.postsRepository.findAll({ where: { user_id } });
  }

  async getAllInclude() {
    return this.postsRepository.findAll({include: User});
  }
}
