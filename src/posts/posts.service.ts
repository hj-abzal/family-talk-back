import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Posts } from "./posts.model";
import { CreatePostDto } from "./create-post.dto";
import { User } from "../auth/models/users.model";
import { Op } from "sequelize";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts) private postsRepository: typeof Posts
  ) {
  }

  async create(dto: CreatePostDto): Promise<Posts> {
    return await this.postsRepository.create(dto);
  }

  async getAll(user_id: number, query: any): Promise<Posts[]> {
    let where: any = { user_id };
    if (query.search) {
      where.title = {
        [Op.like]: `%${query.search}%`
      };
    }
    return this.postsRepository.findAll({ where, ...query });
  }

  async getAllInclude(query: any) {
    let where: any = { };

    if (query.search) {
      where.title = {
        [Op.like]: `%${query.search}%`
      };
    }
    return this.postsRepository.findAll({ include: User, where, ...query });
  }
}
