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
import { ReadingAnswersService } from './reading-answers.service.js';
import { CreateReadingAnswerDto } from './dto/create-reading-answer.dto.js';
import { UpdateReadingAnswerDto } from './dto/update-reading-answer.dto.js';
let ReadingAnswersController = class ReadingAnswersController {
    constructor(readingAnswersService) {
        this.readingAnswersService = readingAnswersService;
    }
    create(createReadingAnswerDto) {
        return this.readingAnswersService.create(createReadingAnswerDto);
    }
    findAll() {
        return this.readingAnswersService.findAll();
    }
    findByReadingId(readingId) {
        return this.readingAnswersService.findByReadingId(readingId);
    }
    findOne(id) {
        return this.readingAnswersService.findOne(id);
    }
    update(id, updateDto) {
        return this.readingAnswersService.update(id, updateDto);
    }
    remove(id) {
        return this.readingAnswersService.remove(id);
    }
};
__decorate([
    Post(),
    UseGuards(JwtAuthGuard),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReadingAnswerDto]),
    __metadata("design:returntype", void 0)
], ReadingAnswersController.prototype, "create", null);
__decorate([
    Get(),
    UseGuards(JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReadingAnswersController.prototype, "findAll", null);
__decorate([
    Get('reading/:readingId'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('readingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingAnswersController.prototype, "findByReadingId", null);
__decorate([
    Get(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingAnswersController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateReadingAnswerDto]),
    __metadata("design:returntype", void 0)
], ReadingAnswersController.prototype, "update", null);
__decorate([
    Delete(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingAnswersController.prototype, "remove", null);
ReadingAnswersController = __decorate([
    Controller('reading-answers'),
    __metadata("design:paramtypes", [ReadingAnswersService])
], ReadingAnswersController);
export { ReadingAnswersController };
//# sourceMappingURL=reading-answers.controller.js.map