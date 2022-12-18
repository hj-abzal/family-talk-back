import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../models/users.model";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {
  }

  async create(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(dto);
  }

  async update(user: User, id: number): Promise<any> {
    delete user.family_space_id;
    delete user.id;
    return await this.userRepository.update(
      { ...user },
      { where: { id } }
    ).then(() => {
      return { message: "ok", user };
    });
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.destroy({ where: { id } })
      .then(() => {
        return { message: "ok", id };
      })
      .catch(() => {
        throw new BadRequestException({ in: "delete" });
      });
  }

  async getByLogin(login: string): Promise<any> {
    return await this.userRepository.findOne({ where: { login } });
  }

  async getById(id: number): Promise<any> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
