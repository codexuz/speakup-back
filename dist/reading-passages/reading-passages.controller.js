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
import { ReadingPassagesService } from './reading-passages.service.js';
import { CreateReadingPassageDto } from './dto/create-reading-passage.dto.js';
import { UpdateReadingPassageDto } from './dto/update-reading-passage.dto.js';
let ReadingPassagesController = class ReadingPassagesController {
    constructor(readingPassagesService) {
        this.readingPassagesService = readingPassagesService;
    }
    create(createDto) {
        return this.readingPassagesService.create(createDto);
    }
    findAll() {
        return this.readingPassagesService.findAll();
    }
    findByReadingId(readingId) {
        return this.readingPassagesService.findByReadingId(readingId);
    }
    findByPart(part) {
        return this.readingPassagesService.findByPart(part);
    }
    findOne(id) {
        return this.readingPassagesService.findOne(id);
    }
    update(id, updateDto) {
        return this.readingPassagesService.update(id, updateDto);
    }
    remove(id) {
        return this.readingPassagesService.remove(id);
    }
};
__decorate([
    Post(),
    UseGuards(JwtAuthGuard),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReadingPassageDto]),
    __metadata("design:returntype", void 0)
], ReadingPassagesController.prototype, "create", null);
__decorate([
    Get(),
    UseGuards(JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReadingPassagesController.prototype, "findAll", null);
__decorate([
    Get('reading/:readingId'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('readingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingPassagesController.prototype, "findByReadingId", null);
__decorate([
    Get('part/:part'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('part')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingPassagesController.prototype, "findByPart", null);
__decorate([
    Get(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingPassagesController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateReadingPassageDto]),
    __metadata("design:returntype", void 0)
], ReadingPassagesController.prototype, "update", null);
__decorate([
    Delete(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReadingPassagesController.prototype, "remove", null);
ReadingPassagesController = __decorate([
    Controller('reading-passages'),
    __metadata("design:paramtypes", [ReadingPassagesService])
], ReadingPassagesController);
export { ReadingPassagesController };
//# sourceMappingURL=reading-passages.controller.js.map