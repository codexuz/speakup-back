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
import { ReadingQuestionsService } from './reading-questions.service.js';
import { CreateReadingQuestionDto } from './dto/create-reading-question.dto.js';
import { UpdateReadingQuestionDto } from './dto/update-reading-question.dto.js';
let ReadingQuestionsController = class ReadingQuestionsController {
    constructor(readingQuestionsService) {
        this.readingQuestionsService = readingQuestionsService;
    }
    create(createDto) {
        return this.readingQuestionsService.create(createDto);
    }
    findAll() {
        return this.readingQuestionsService.findAll();
    }
    findByReadingTextId(textId) {
        return this.readingQuestionsService.findByReadingTextId(textId);
    }
    findByPart(part) {
        return this.readingQuestionsService.findByPart(part);
    }
    findOne(id) {
        return this.readingQuestionsService.findOne(id);
    }
    update(id, updateDto) {
        return this.readingQuestionsService.update(id, updateDto);
    }
    remove(id) {
        return this.readingQuestionsService.remove(id);
    }
};
__decorate([
    Post(),
    UseGuards(JwtAuthGuard),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReadingQuestionDto]),
    __metadata("design:returntype", void 0)
], ReadingQuestionsController.prototype, "create", null);
__decorate([
    Get(),
    UseGuards(JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReadingQuestionsController.prototype, "findAll", null);
__decorate([
    Get('text/:textId'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('textId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingQuestionsController.prototype, "findByReadingTextId", null);
__decorate([
    Get('part/:part'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('part')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingQuestionsController.prototype, "findByPart", null);
__decorate([
    Get(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingQuestionsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateReadingQuestionDto]),
    __metadata("design:returntype", void 0)
], ReadingQuestionsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingQuestionsController.prototype, "remove", null);
ReadingQuestionsController = __decorate([
    Controller('reading-questions'),
    __metadata("design:paramtypes", [ReadingQuestionsService])
], ReadingQuestionsController);
export { ReadingQuestionsController };
//# sourceMappingURL=reading-questions.controller.js.map