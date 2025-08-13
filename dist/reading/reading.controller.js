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
import { ReadingService } from './reading.service.js';
import { CreateReadingDto } from './dto/create-reading.dto.js';
import { UpdateReadingDto } from './dto/update-reading.dto.js';
let ReadingController = class ReadingController {
    constructor(readingService) {
        this.readingService = readingService;
    }
    create(createReadingDto) {
        return this.readingService.create(createReadingDto);
    }
    findAll() {
        return this.readingService.findAll();
    }
    findActive() {
        return this.readingService.findActive();
    }
    findByTestId(testId) {
        return this.readingService.findByTestId(testId);
    }
    findOne(id) {
        return this.readingService.findOne(id);
    }
    update(id, updateReadingDto) {
        return this.readingService.update(id, updateReadingDto);
    }
    remove(id) {
        return this.readingService.remove(id);
    }
};
__decorate([
    Post(),
    UseGuards(JwtAuthGuard),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReadingDto]),
    __metadata("design:returntype", void 0)
], ReadingController.prototype, "create", null);
__decorate([
    Get(),
    UseGuards(JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReadingController.prototype, "findAll", null);
__decorate([
    Get('active'),
    UseGuards(JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReadingController.prototype, "findActive", null);
__decorate([
    Get('test/:testId'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('testId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingController.prototype, "findByTestId", null);
__decorate([
    Get(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateReadingDto]),
    __metadata("design:returntype", void 0)
], ReadingController.prototype, "update", null);
__decorate([
    Delete(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingController.prototype, "remove", null);
ReadingController = __decorate([
    Controller('reading'),
    __metadata("design:paramtypes", [ReadingService])
], ReadingController);
export { ReadingController };
//# sourceMappingURL=reading.controller.js.map