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
import { SpeakingPartsService } from './speaking-parts.service.js';
import { CreateSpeakingPartDto } from './dto/create-speaking-part.dto.js';
import { UpdateSpeakingPartDto } from './dto/update-speaking-part.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
let SpeakingPartsController = class SpeakingPartsController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findByTestId(testId) {
        return this.service.findByTestId(testId);
    }
    findByPartType(partType) {
        return this.service.findByPartType(partType);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
__decorate([
    Post(),
    UseGuards(JwtAuthGuard),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSpeakingPartDto]),
    __metadata("design:returntype", void 0)
], SpeakingPartsController.prototype, "create", null);
__decorate([
    Get(),
    UseGuards(JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SpeakingPartsController.prototype, "findAll", null);
__decorate([
    Get('test/:testId'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('testId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingPartsController.prototype, "findByTestId", null);
__decorate([
    Get('part-type/:partType'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('partType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingPartsController.prototype, "findByPartType", null);
__decorate([
    Get(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingPartsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateSpeakingPartDto]),
    __metadata("design:returntype", void 0)
], SpeakingPartsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingPartsController.prototype, "remove", null);
SpeakingPartsController = __decorate([
    Controller('speaking-parts'),
    __metadata("design:paramtypes", [SpeakingPartsService])
], SpeakingPartsController);
export { SpeakingPartsController };
//# sourceMappingURL=speaking-parts.controller.js.map