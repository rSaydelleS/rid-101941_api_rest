import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guards";
import { JwtAuthGuard } from "./guards/jwt.guards";
import type { Request } from "express";

@Controller("/auth")
export class AuthController{
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post()
   async signIn(@Body()postData:{email: string, pass:string}):Promise<{access_token:string}> {
    const {email, pass} = postData;
    const token = await this.authService.login({email, pass});
    return token;
   };

   @Get("/status")
   @UseGuards(JwtAuthGuard)
    status(@Req() req:Request){
      console.log(req.user)
    }
}
