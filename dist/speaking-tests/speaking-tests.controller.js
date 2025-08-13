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
import { SpeakingTestsService } from './speaking-tests.service.js';
import { CreateSpeakingTestDto } from './dto/create-speaking-test.dto.js';
import { UpdateSpeakingTestDto } from './dto/update-speaking-test.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
let SpeakingTestsController = class SpeakingTestsController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findByStatus(status) {
        const isActive = status === 'true';
        return this.service.findByIsActive(isActive);
    }
    findWithResponses(id) {
        return this.service.findWithResponses(id);
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
    __metadata("design:paramtypes", [CreateSpeakingTestDto]),
    __metadata("design:returntype", void 0)
], SpeakingTestsController.prototype, "create", null);
__decorate([
    Get(),
    UseGuards(JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SpeakingTestsController.prototype, "findAll", null);
__decorate([
    Get('active/:status'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingTestsController.prototype, "findByStatus", null);
__decorate([
    Get(':id/with-responses'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingTestsController.prototype, "findWithResponses", null);
__decorate([
    Get(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingTestsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateSpeakingTestDto]),
    __metadata("design:returntype", void 0)
], SpeakingTestsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingTestsController.prototype, "remove", null);
SpeakingTestsController = __decorate([
    Controller('speaking-tests'),
    __metadata("design:paramtypes", [SpeakingTestsService])
], SpeakingTestsController);
export { SpeakingTestsController };
//# sourceMappingURL=speaking-tests.controller.js.map