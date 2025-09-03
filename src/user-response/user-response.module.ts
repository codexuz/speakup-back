import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserResponseService } from './user-response.service.js';
import { UserResponseController } from './user-response.controller.js';
import { UserResponse } from './entities/user-response.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    SequelizeModule.forFeature([UserResponse]),
    AuthModule
  ],
  controllers: [UserResponseController],
  providers: [UserResponseService],
  exports: [UserResponseService]
})
export class UserResponseModule {}
