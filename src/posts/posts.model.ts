import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../auth/models/users.model";
import { ApiProperty } from "@nestjs/swagger";


interface PostsCreationAttrs {
  title: string;
  content: string
  picture: string;
  user_id: number;
}

@Table({ tableName: "posts" })
export class Posts extends Model<Posts, PostsCreationAttrs> {

  @ApiProperty({example: 1, description: 'Id of post'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: "What is React?!", description: 'title of user'})
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({example: 'React is ...', description: 'main text'})
  @Column({ type: DataType.STRING, allowNull: true })
  content: string;

  @ApiProperty({example: ['base64'], description: 'base 64'})
  @Column({ type: DataType.STRING(1000000) })
  picture: string;


  @ApiProperty({example: 1, description: 'Id of author user'})
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  author: User;
}