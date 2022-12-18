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

  async getAllInclude(query: any, family_space_id: number) {
    const limit = 10;
    let page = 1;
    let where: any = {};

    if (query.search) {
      where.title = {
        [Op.like]: `%${query.search}%`
      };
    }

    let allPosts = await this.postsRepository.findAll({include: User, where})
      .then((res) => res.filter(p => p.author.family_space_id === family_space_id));
    const totalCount = allPosts.length;

    if (query.page) {
      page = query.page
    }
    if (totalCount > limit) {
      const amount = limit * page;

      allPosts = allPosts.filter((el, i) => {
       if (i < amount - limit || i >= amount) {
         return false
       }
        return true
      });
    }

    return {
      totalCount,
      currentPage: query?.page || 1,
      news: allPosts
    };
  }
}
