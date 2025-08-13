var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { User } from './entities/user.entity.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Otp } from '../otp/entities/otp.entity.js';
import { AuthModule } from '../auth/auth.module.js';
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    Module({
        controllers: [UsersController],
        providers: [UsersService],
        imports: [
            SequelizeModule.forFeature([User, Otp]),
            JwtModule.register({
                secret: process.env.JWT_SECRET || 'ihwduihqw8899wdhspeakupedumo_2022',
                signOptions: { expiresIn: '30d' },
            }),
            AuthModule,
        ],
    })
], UsersModule);
export { UsersModule };
//# sourceMappingURL=users.module.js.map