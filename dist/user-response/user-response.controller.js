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
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { UserResponseService } from './user-response.service.js';
import { CreateUserResponseDto } from './dto/create-user-response.dto.js';
import { UpdateUserResponseDto } from './dto/update-user-response.dto.js';
let UserResponseController = class UserResponseController {
    constructor(userResponseService) {
        this.userResponseService = userResponseService;
    }
    create(createDto) {
        return this.userResponseService.create(createDto);
    }
    findAll() {
        return this.userResponseService.findAll();
    }
    findByUserId(userId) {
        return this.userResponseService.findByUserId(userId);
    }
    findByReadingId(readingId) {
        return this.userResponseService.findByReadingId(readingId);
    }
    findByUserAndReading(userId, readingId) {
        return this.userResponseService.findByUserAndReading(userId, readingId);
    }
    findOne(id) {
        return this.userResponseService.findOne(id);
    }
    update(id, updateDto) {
        return this.userResponseService.update(id, updateDto);
    }
    remove(id) {
        return this.userResponseService.remove(id);
    }
};
__decorate([
    Post(),
    UseGuards(JwtAuthGuard),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserResponseDto]),
    __metadata("design:returntype", void 0)
], UserResponseController.prototype, "create", null);
__decorate([
    Get(),
    UseGuards(JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResponseController.prototype, "findAll", null);
__decorate([
    Get('user/:userId'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResponseController.prototype, "findByUserId", null);
__decorate([
    Get('reading/:readingId'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('readingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResponseController.prototype, "findByReadingId", null);
__decorate([
    Get('user/:userId/reading/:readingId'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('userId')),
    __param(1, Param('readingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserResponseController.prototype, "findByUserAndReading", null);
__decorate([
    Get(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResponseController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateUserResponseDto]),
    __metadata("design:returntype", void 0)
], UserResponseController.prototype, "update", null);
__decorate([
    Delete(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResponseController.prototype, "remove", null);
UserResponseController = __decorate([
    Controller('user-response'),
    __metadata("design:paramtypes", [UserResponseService])
], UserResponseController);
export { UserResponseController };
//# sourceMappingURL=user-response.controller.js.map