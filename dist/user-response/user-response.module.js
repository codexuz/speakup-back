var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserResponseService } from './user-response.service.js';
import { UserResponseController } from './user-response.controller.js';
import { UserResponse } from './entities/user-response.entity.js';
import { AuthModule } from '../auth/auth.module.js';
let UserResponseModule = class UserResponseModule {
};
UserResponseModule = __decorate([
    Module({
        imports: [
            SequelizeModule.forFeature([UserResponse]),
            AuthModule
        ],
        controllers: [UserResponseController],
        providers: [UserResponseService],
        exports: [UserResponseService]
    })
], UserResponseModule);
export { UserResponseModule };
//# sourceMappingURL=user-response.module.js.map