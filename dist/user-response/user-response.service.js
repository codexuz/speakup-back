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
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserResponse } from './entities/user-response.entity.js';
import { User } from '../users/entities/user.entity.js';
import { Reading } from '../reading/entities/reading.entity.js';
let UserResponseService = class UserResponseService {
    constructor(userResponseModel) {
        this.userResponseModel = userResponseModel;
    }
    async create(createDto) {
        return this.userResponseModel.create(createDto);
    }
    async findAll() {
        return this.userResponseModel.findAll({
            include: [User, Reading]
        });
    }
    async findByUserId(userId) {
        return this.userResponseModel.findAll({
            where: { user_id: userId },
            include: [Reading]
        });
    }
    async findByReadingId(readingId) {
        return this.userResponseModel.findAll({
            where: { reading_id: readingId },
            include: [User]
        });
    }
    async findByUserAndReading(userId, readingId) {
        const response = await this.userResponseModel.findOne({
            where: {
                user_id: userId,
                reading_id: readingId
            }
        });
        if (!response) {
            throw new NotFoundException(`User response not found for user ${userId} and reading ${readingId}`);
        }
        return response;
    }
    async findOne(id) {
        const response = await this.userResponseModel.findByPk(id, {
            include: [User, Reading]
        });
        if (!response) {
            throw new NotFoundException(`User response with ID ${id} not found`);
        }
        return response;
    }
    async update(id, updateDto) {
        const response = await this.findOne(id);
        await response.update(updateDto);
        return response;
    }
    async remove(id) {
        const response = await this.findOne(id);
        await response.destroy();
    }
};
UserResponseService = __decorate([
    Injectable(),
    __param(0, InjectModel(UserResponse)),
    __metadata("design:paramtypes", [Object])
], UserResponseService);
export { UserResponseService };
//# sourceMappingURL=user-response.service.js.map