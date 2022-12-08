import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FamilySpace } from "../models/family-space.model";
import { CreateFamilySpaceDto } from "../dto/create-family-space.dto";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class FamilySpaceService {

  constructor(@InjectModel(FamilySpace) private familySpaceRepository: typeof FamilySpace) {
  }

  async create(dto: CreateFamilySpaceDto): Promise<FamilySpace> {
    const candidate = await this.getByLogin(dto.login);
    if (candidate) {
      throw new HttpException("Space with such login already exist", HttpStatus.BAD_REQUEST);
    }
    return await this.familySpaceRepository.create(dto);
  }

  async getByLogin(login): Promise<any> {
    return await this.familySpaceRepository.findOne({where: {login}})
  }
}
