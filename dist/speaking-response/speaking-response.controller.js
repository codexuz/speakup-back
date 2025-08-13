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
import { SpeakingResponseService } from './speaking-response.service.js';
import { CreateSpeakingResponseDto } from './dto/create-speaking-response.dto.js';
import { UpdateSpeakingResponseDto } from './dto/update-speaking-response.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AssessmentStatusService } from './assessment-status.service.js';
let SpeakingResponseController = class SpeakingResponseController {
    constructor(service, assessmentStatusService) {
        this.service = service;
        this.assessmentStatusService = assessmentStatusService;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findByUserId(userId) {
        return this.service.findByUserId(userId);
    }
    findByTestId(testId) {
        return this.service.findByTestId(testId);
    }
    findByUserAndTest(userId, testId) {
        return this.service.findByUserAndTest(userId, testId);
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
    assessSpeakingResponse(id) {
        return this.assessmentStatusService.processAssessment(id);
    }
    async getAssessmentStatus(id) {
        const response = await this.service.findOne(id);
        if (!response) {
            return { status: 'not_found', message: 'Speaking response not found' };
        }
        const responseData = response.response;
        if (responseData && responseData['assessment']) {
            return {
                status: 'completed',
                assessedAt: responseData['assessment'].timestamp,
                hasTranscript: !!response.transcript,
            };
        }
        return { status: 'not_assessed' };
    }
    async batchAssessByUser(userId) {
        const responses = await this.service.findByUserId(userId);
        const responseIds = responses.map(response => response.id);
        return this.assessmentStatusService.processBatchAssessment(responseIds);
    }
    async batchAssessByUserAndTest(userId, testId) {
        const responses = await this.service.findByUserAndTest(userId, testId);
        const responseIds = responses.map(response => response.id);
        return this.assessmentStatusService.processBatchAssessment(responseIds);
    }
};
__decorate([
    Post(),
    UseGuards(JwtAuthGuard),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSpeakingResponseDto]),
    __metadata("design:returntype", void 0)
], SpeakingResponseController.prototype, "create", null);
__decorate([
    Get(),
    UseGuards(JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SpeakingResponseController.prototype, "findAll", null);
__decorate([
    Get('user/:userId'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingResponseController.prototype, "findByUserId", null);
__decorate([
    Get('test/:testId'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('testId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingResponseController.prototype, "findByTestId", null);
__decorate([
    Get('user/:userId/test/:testId'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('userId')),
    __param(1, Param('testId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SpeakingResponseController.prototype, "findByUserAndTest", null);
__decorate([
    Get(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingResponseController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateSpeakingResponseDto]),
    __metadata("design:returntype", void 0)
], SpeakingResponseController.prototype, "update", null);
__decorate([
    Delete(':id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingResponseController.prototype, "remove", null);
__decorate([
    Post('assess/:id'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingResponseController.prototype, "assessSpeakingResponse", null);
__decorate([
    Get('assessment/:id/status'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpeakingResponseController.prototype, "getAssessmentStatus", null);
__decorate([
    Post('assess-batch/user/:userId'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpeakingResponseController.prototype, "batchAssessByUser", null);
__decorate([
    Post('assess-batch/user/:userId/test/:testId'),
    UseGuards(JwtAuthGuard),
    __param(0, Param('userId')),
    __param(1, Param('testId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SpeakingResponseController.prototype, "batchAssessByUserAndTest", null);
SpeakingResponseController = __decorate([
    Controller('speaking-response'),
    __metadata("design:paramtypes", [SpeakingResponseService,
        AssessmentStatusService])
], SpeakingResponseController);
export { SpeakingResponseController };
//# sourceMappingURL=speaking-response.controller.js.map