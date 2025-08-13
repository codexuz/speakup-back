var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity.js';
import { JwtService } from '@nestjs/jwt';
import { Otp } from '../otp/entities/otp.entity.js';
let UsersService = class UsersService {
    constructor(userModel, otpModel, jwtService) {
        this.userModel = userModel;
        this.otpModel = otpModel;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const user = new User();
        user.username = createUserDto.username;
        user.first_name = createUserDto.first_name;
        user.last_name = createUserDto.last_name;
        user.password = createUserDto.password;
        await user.save();
        return user;
    }
    async findAll() {
        return this.userModel.findAll({
            attributes: { exclude: ['password_hash'] },
        });
    }
    async findOne(id) {
        const user = await this.userModel.findByPk(id, {
            attributes: { exclude: ['password_hash'] },
        });
        if (!user)
            throw new NotFoundException('User not found');
        return user;
    }
    async findByTelegramId(telegramId) {
        const user = await this.userModel.findOne({
            where: { telegramId },
            attributes: { exclude: ['password_hash'] },
        });
        if (!user)
            throw new NotFoundException('User not found');
        return user;
    }
    async findByFirstName(firstName) {
        const users = await this.userModel.findAll({
            where: { first_name: firstName },
            attributes: { exclude: ['password_hash'] },
        });
        return users;
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        if (updateUserDto.password) {
            user.password = updateUserDto.password;
        }
        Object.assign(user, updateUserDto);
        await user.save();
        return user;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await user.destroy();
    }
    async loginWithOtp(loginUserDto) {
        const { otp_code } = loginUserDto;
        const otp = await this.otpModel.findOne({ where: { otp_code, isExpired: false } });
        if (!otp || new Date(otp.expiration_date) < new Date())
            throw new UnauthorizedException('Invalid or expired OTP');
        const user = await this.userModel.findOne({ where: { telegramId: otp.telegram_id, is_active: true } });
        if (!user)
            throw new UnauthorizedException('User not found');
        otp.isExpired = true;
        await otp.save();
        user.last_login = new Date();
        await user.save();
        const payload = { sub: user.id, role: user.role, telegram_id: user.telegramId };
        return { access_token: this.jwtService.sign(payload), role: user.role, user };
    }
};
UsersService = __decorate([
    Injectable(),
    __param(0, InjectModel(User)),
    __param(1, InjectModel(Otp)),
    __metadata("design:paramtypes", [Object, Object, JwtService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map