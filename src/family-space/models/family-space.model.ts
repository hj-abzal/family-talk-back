import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../../auth/models/users.model";


interface FamilySpaceCreationAttrs {
    telegram_id: number;
    login: string;
    password: string;
}

@Table({ tableName: "family-space" })
export class FamilySpace extends Model<FamilySpace, FamilySpaceCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    login: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING })
    picture: string;

    @HasMany(() => User)
    members: User[]
}