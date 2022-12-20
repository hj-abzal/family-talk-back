import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../../auth/models/users.model";
import { ApiProperty } from "@nestjs/swagger";


interface FamilySpaceCreationAttrs {
    telegram_id: number;
    login: string;
    password: string;
}

@Table({ tableName: "family-space" })
export class FamilySpace extends Model<FamilySpace, FamilySpaceCreationAttrs> {

    @ApiProperty({example: 1, description: 'Id of family space'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: "Lets go", description: 'title of family'})
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ApiProperty({example: "Here we go", description: 'status of family'})
    @Column({ type: DataType.STRING, defaultValue: "We are happy family!" })
    status: string;

    @ApiProperty({example: 'Suan', description: 'login of family space'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    login: string;

    @ApiProperty({example: "123", description: 'password of space!'})
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({example: "https://my-photo.com", description: 'photo of user'})
    @Column({ type: DataType.STRING(100000) })
    picture: string;

    @HasMany(() => User)
    members: User[]
}