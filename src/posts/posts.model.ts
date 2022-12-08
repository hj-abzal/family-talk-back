import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../auth/models/users.model";


interface PostsCreationAttrs {
    telegram_id: number;
    login: string;
    password: string;
}

@Table({ tableName: "posts" })
export class Posts extends Model<Posts, PostsCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.STRING })
    picture: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER,  allowNull: false })
    user_id: number;
}