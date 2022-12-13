import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { FamilySpace } from "../../family-space/models/family-space.model";
import { Posts } from "../../posts/posts.model";

interface UserCreationAttrs {
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING })
  picture: string;

  @HasMany(() => Posts)
  posts: Posts[];

  @ForeignKey(() => FamilySpace)
  @Column({ type: DataType.INTEGER,  allowNull: false })
  family_space_id: number;

  @BelongsTo(() => FamilySpace)
  family_space: FamilySpace;
}