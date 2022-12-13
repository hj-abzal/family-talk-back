import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../auth/models/users.model";


interface PostsCreationAttrs {
  title: string;
  content: string
  picture: string;
  user_id: number;
}

@Table({ tableName: "posts" })
export class Posts extends Model<Posts, PostsCreationAttrs> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  content: string;

  @Column({ type: DataType.STRING })
  picture: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  author: User;
}