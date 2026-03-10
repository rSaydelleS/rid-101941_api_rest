import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import {compareSync } from "bcrypt";
import User from "src/db/entities/users/user.entity";
import { ValidateInterface } from "src/types/UserInterface";
import { Repository } from "typeorm";

@Injectable()
export class AuthService{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async validateUser({email, pass}: ValidateInterface){
    const findUser = await this.userRepository.findOneBy({email});
    if (findUser && compareSync(pass, findUser.password)) {
      const { password, ...result } = findUser;
      return result;
    }
    return null;
  }

  async login({email, pass}: ValidateInterface):Promise<{access_token:string}> {
    const findUser = await this.userRepository.findOneBy({email});
    if(findUser === null){
      throw new UnauthorizedException();
    };
    const verifyPassword = await compareSync(pass, findUser.password);
    if(!verifyPassword){
      throw new UnauthorizedException();
    }
    const payload = {sub: findUser.id, name:findUser.name};
    const token:string = await this.jwtService.signAsync(payload)
    return {access_token: token}
  }
}
