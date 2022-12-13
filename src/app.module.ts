import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { FamilySpaceModule } from "./family-space/family-space.module";
import { FamilySpace } from "./family-space/models/family-space.model";
import { User } from "./auth/models/users.model";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { Posts } from "./posts/posts.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      ssl: false,
      models: [FamilySpace, User, Posts],
      autoLoadModels: true
    }),
    FamilySpaceModule,
    AuthModule,
    PostsModule
  ]
})
export class AppModule {
}
