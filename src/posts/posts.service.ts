import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Posts } from "./posts.model";
import { CreatePostDto } from "./create-post.dto";
import { User } from "../auth/models/users.model";
import { Op } from "sequelize";
import { FindOptions } from "sequelize/types/model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts) private postsRepository: typeof Posts
  ) {
  }

  async create(dto: CreatePostDto): Promise<Posts> {
    return await this.postsRepository.create(dto);
  }

  async getAll(user_id: number, query: any): Promise<any> {
    const limit = 10;

    let where: any = { user_id };
    if (query.search) {
      where.title = {
        [Op.like]: `%${query.search}%`
      };
    }

    let request: FindOptions = { where, limit, offset: 0 };
    if (query.page) {
      request.offset = query.page * limit - limit;
    }

    return {
      currentPage: query?.page || 1,
      totalCount: await this.postsRepository.count({where}),
      posts: await this.postsRepository.findAll(request)
    };
  }

  async getAllInclude(query: any) {
    const limit = 10;
    let where: any = {};

    if (query.search) {
      where.title = {
        [Op.like]: `%${query.search}%`
      };
    }

    let request: FindOptions = { include: User, where, limit, offset: 0 };
    if (query.page) {
      request.offset = query.page * limit - limit;
    }
    return {
      currentPage: query?.page || 1,
      totalCount: await this.postsRepository.count({where}),
      posts: await this.postsRepository.findAll(request)
    };
  }
}
