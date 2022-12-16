import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { FamilySpace } from "../../family-space/models/family-space.model";
import { Posts } from "../../posts/posts.model";
import { ApiProperty } from "@nestjs/swagger";

interface UserCreationAttrs {
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({example: 1, description: 'Id of user'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: 'Suan', description: 'login of user'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @ApiProperty({example: "123", description: 'password of user string!'})
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({example: "Suan", description: 'name of user'})
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({example: "Hey there I am using Family talk", description: 'default status'})
  @Column({ type: DataType.STRING, defaultValue: 'Hey there I am using Family talk'})
  status: string;

  @ApiProperty({example: "https://my-photo.com", description: 'photo of user'})
  @Column({ type: DataType.STRING })
  picture: string;

  @ApiProperty({example: 'PostsType[]', description: 'Posts of user'})
  @HasMany(() => Posts)
  posts: Posts[];

  @ApiProperty({example: 2, description: 'id of family space'})
  @ForeignKey(() => FamilySpace)
  @Column({ type: DataType.INTEGER,  allowNull: false })
  family_space_id: number;

  @BelongsTo(() => FamilySpace)
  family_space: FamilySpace;
}