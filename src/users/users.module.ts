import { Module } from "@nestjs/common";
import UsersService from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "src/db/entities/users/user.entity";
import UsersController from "./users.controllers";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersModule]
})
export default class UsersModule{
  constructor(private readonly usersService: UsersService){}
}
