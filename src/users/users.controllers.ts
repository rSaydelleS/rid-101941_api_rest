import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import UsersService from "./users.service";
import type { Createuser, UpdateUserInterface, UserInterface } from "src/types/UserInterface";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt.guards";


@Controller('/users')
export default class UsersController {
  constructor(private readonly usersService: UsersService){}

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  getAllUsers() {
    return this.usersService.getAllUsers()
  };

  @Get("/:id")
  @UseGuards(JwtAuthGuard)
  getById(@Param("id")id: number):Promise<UserInterface | null> {
    return this.usersService.getOneUser(id)
  };

  @Post("/create")
  createUser(@Body()postData: {name: string, email: string, password: string}):Promise<string | undefined> {
    const {name, email, password} = postData;
    return this.usersService.create({name, email, password})
  };

  @Put("/update/:id")
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Param("id")id: number,
    @Body()postData:{ name: string, email: string, password: string}
  ):Promise<string | undefined> {
    const {name, email, password} = postData;
    return this.usersService.updateUser({id, name, email, password});
  };

  @Delete("/:id")
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: number):Promise<string> {
    return this.usersService.deleteUser(id);

  }
}
