import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DbModule } from './db/db.module';
import UsersModule from './users/users.module';
import UsersController from './users/users.controllers';
import UsersService from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import User from './db/entities/users/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    DbModule,
    AuthModule,
  ],
  providers: [AppService, UsersService, AuthService],
  controllers: [AppController,UsersController, AuthController],
})
export class AppModule {}
