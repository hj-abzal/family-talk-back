import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { User } from "../models/users.model";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const token = await this.generateToken(user);
    return { user, token};
  }

  async me(id: number) {
    const user = await this.userService.getById(id)
    const token = await this.generateToken(user);
    return { user, token};
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getByLogin(userDto.login);
    if (candidate) {
      throw new HttpException("User with such login already exist", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.create({ ...userDto, password: hashPassword });
    return {addedUser: user};
  }

  private async generateToken(user: User) {
    const { id, login } = user;
    return this.jwtService.sign({ id, login });
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getByLogin(userDto.login);
    if (user) {
      const checkPassword = await bcrypt.compare(userDto.password, user.password);
      if (checkPassword) {
        return user;
      }
      throw new UnauthorizedException({ message: "Invalid password" });
    }
    throw new UnauthorizedException({ message: "Invalid login" });
  }
}
