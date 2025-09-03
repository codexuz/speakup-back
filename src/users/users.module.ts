import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { User } from './entities/user.entity.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Otp } from '../otp/entities/otp.entity.js';
import { AuthModule } from '../auth/auth.module.js';
@Module({
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
export class UsersModule {}
