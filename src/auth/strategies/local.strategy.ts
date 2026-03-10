import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { ValidateInterface } from "src/types/UserInterface";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStratagy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "pass"
    });

  };

  async validate(email:string, pass:string) {
    const user = await this.authService.validateUser({email, pass});
    if(!user) {
      throw new UnauthorizedException();
    };
    return user;
  }
}
