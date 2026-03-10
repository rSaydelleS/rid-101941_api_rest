import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/db/entities/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import {config} from "dotenv";
import { ConfigService } from '@nestjs/config';
import { LocalStratagy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtStrategy } from './strategies/jwt.stategy';
import { JwtAuthGuard } from './guards/jwt.guards';
config()

const configService = new ConfigService();
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: configService.get<string>("JWT_SECRET"),
      signOptions: {expiresIn: "2h"}
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStratagy, jwtStrategy],
  exports: [AuthService]
})
export class AuthModule {
  constructor(private readonly autService: AuthService){}
}
