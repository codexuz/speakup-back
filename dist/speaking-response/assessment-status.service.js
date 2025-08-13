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
var AssessmentStatusService_1;
import { Injectable, Inject, forwardRef, Logger } from '@nestjs/common';
import { SpeakingResponseService } from './speaking-response.service.js';
let AssessmentStatusService = AssessmentStatusService_1 = class AssessmentStatusService {
    constructor(speakingResponseService) {
        this.speakingResponseService = speakingResponseService;
        this.logger = new Logger(AssessmentStatusService_1.name);
    }
    async processAssessment(responseId) {
        try {
            this.logger.log(`Processing immediate assessment for response ID: ${responseId}`);
            await this.speakingResponseService.assessSpeakingResponse(responseId);
            return {
                success: true,
                message: `Response ${responseId} assessed successfully`
            };
        }
        catch (error) {
            this.logger.error(`Failed to assess response ${responseId}: ${error.message}`, error.stack);
            return {
                success: false,
                message: `Failed to process assessment: ${error.message}`
            };
        }
    }
    async processBatchAssessment(responseIds) {
        const assessed = [];
        const failed = [];
        for (const responseId of responseIds) {
            try {
                this.logger.log(`Processing assessment for response ID: ${responseId}`);
                await this.speakingResponseService.assessSpeakingResponse(responseId);
                assessed.push(responseId);
            }
            catch (error) {
                this.logger.error(`Failed to assess response ${responseId}: ${error.message}`);
                failed.push(responseId);
            }
        }
        return {
            success: failed.length === 0,
            message: `Assessed ${assessed.length} responses, ${failed.length} failed`,
            assessed,
            failed
        };
    }
};
AssessmentStatusService = AssessmentStatusService_1 = __decorate([
    Injectable(),
    __param(0, Inject(forwardRef(() => SpeakingResponseService))),
    __metadata("design:paramtypes", [SpeakingResponseService])
], AssessmentStatusService);
export { AssessmentStatusService };
//# sourceMappingURL=assessment-status.service.js.map