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
var SpeakingResponseService_1;
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SpeakingResponse } from './entities/speaking-response.entity.js';
import { User } from '../users/entities/user.entity.js';
import { SpeakingTests } from '../speaking-tests/entities/speaking-test.entity.js';
import { DeepgramService } from '../deepgram/deepgram.service.js';
import { OpenaiService } from '../openai/openai.service.js';
import { VocabularyLevelService } from '../vocabulary-level/vocabulary-level.service.js';
let SpeakingResponseService = SpeakingResponseService_1 = class SpeakingResponseService {
    constructor(speakingResponseModel, deepgramService, openaiService, vocabularyLevelService) {
        this.speakingResponseModel = speakingResponseModel;
        this.deepgramService = deepgramService;
        this.openaiService = openaiService;
        this.vocabularyLevelService = vocabularyLevelService;
        this.logger = new Logger(SpeakingResponseService_1.name);
    }
    async create(createDto) {
        this.logger.log('Creating new speaking response');
        const newResponse = await this.speakingResponseModel.create(createDto);
        this.logger.log(`Created new speaking response with ID: ${newResponse.id}`);
        if (newResponse.audio_url) {
            try {
                this.logger.log(`Starting immediate assessment for response ID: ${newResponse.id}`);
                setTimeout(async () => {
                    try {
                        await this.assessSpeakingResponse(newResponse.id);
                    }
                    catch (error) {
                        this.logger.error(`Async assessment error: ${error.message}`, error.stack);
                    }
                }, 0);
            }
            catch (error) {
                this.logger.error(`Error setting up assessment: ${error.message}`, error.stack);
            }
        }
        return newResponse;
    }
    async findAll() {
        return this.speakingResponseModel.findAll({
            include: [User, SpeakingTests]
        });
    }
    async findOne(id) {
        const response = await this.speakingResponseModel.findByPk(id, {
            include: [User, SpeakingTests]
        });
        if (!response)
            throw new NotFoundException('Speaking response not found');
        return response;
    }
    async findByUserId(userId) {
        return this.speakingResponseModel.findAll({
            where: { user_id: userId },
            include: [User, SpeakingTests]
        });
    }
    async findByTestId(testId) {
        return this.speakingResponseModel.findAll({
            where: { test_id: testId },
            include: [User, SpeakingTests]
        });
    }
    async findByUserAndTest(userId, testId) {
        return this.speakingResponseModel.findAll({
            where: {
                user_id: userId,
                test_id: testId
            },
            include: [User, SpeakingTests]
        });
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
    async assessSpeakingResponse(responseId) {
        try {
            this.logger.log(`Starting assessment for speaking response: ${responseId}`);
            const response = await this.findOne(responseId);
            if (!response) {
                throw new NotFoundException(`Speaking response with ID ${responseId} not found`);
            }
            if (response.response && response.response['assessment']) {
                this.logger.log(`Response ${responseId} has already been assessed. Returning existing assessment.`);
                return response.response['assessment'];
            }
            let transcript = '';
            if (response.transcript) {
                transcript = response.transcript;
                this.logger.log(`Using existing transcript for response ${responseId}`);
            }
            else {
                this.logger.log(`Transcribing audio from URL: ${response.audio_url}`);
                const transcriptionResult = await this.deepgramService.transcribeRemoteAudio(response.audio_url);
                transcript = transcriptionResult.results.channels[0].alternatives[0].transcript || '';
                response.transcript = transcript;
                await response.save();
                this.logger.log(`Transcript saved for response ${responseId}`);
            }
            if (!transcript || transcript.trim().length < 5) {
                const emptyResponseMessage = {
                    id: responseId,
                    transcript: '',
                    error: "empty_response",
                    message: "No speech detected in the audio. Please record your response again.",
                    timestamp: new Date()
                };
                response.response = {
                    ...(response.response || {}),
                    assessment: emptyResponseMessage
                };
                await response.save();
                this.logger.log(`Empty response detected for ${responseId}`);
                return emptyResponseMessage;
            }
            this.logger.log(`Analyzing speaking with OpenAI for response ${responseId}`);
            const aiAssessment = await this.openaiService.assessSpeaking(transcript);
            this.logger.log(`Analyzing vocabulary level for response ${responseId}`);
            const vocabLevelResult = await this.vocabularyLevelService.checkLevel(transcript);
            const assessmentResult = {
                id: responseId,
                transcript,
                aiAssessment,
                vocabularyLevel: vocabLevelResult,
                timestamp: new Date()
            };
            response.response = {
                ...(response.response || {}),
                assessment: assessmentResult
            };
            await response.save();
            this.logger.log(`Assessment completed and saved for response ${responseId}`);
            return assessmentResult;
        }
        catch (error) {
            this.logger.error(`Error assessing speaking response ${responseId}: ${error.message}`, error.stack);
            throw error;
        }
    }
    async batchAssessSpeakingResponses(userId, testId) {
        try {
            this.logger.log(`Starting batch assessment for user ${userId}${testId ? ` and test ${testId}` : ''}`);
            const responses = testId
                ? await this.findByUserAndTest(userId, testId)
                : await this.findByUserId(userId);
            if (!responses.length) {
                this.logger.warn(`No responses found for user ${userId}${testId ? ` and test ${testId}` : ''}`);
                return [];
            }
            const assessmentResults = [];
            for (const response of responses) {
                try {
                    const result = await this.assessSpeakingResponse(response.id);
                    assessmentResults.push(result);
                }
                catch (error) {
                    this.logger.error(`Error assessing response ${response.id}: ${error.message}`);
                }
            }
            this.logger.log(`Batch assessment completed for ${assessmentResults.length} of ${responses.length} responses`);
            return assessmentResults;
        }
        catch (error) {
            this.logger.error(`Error in batch assessment: ${error.message}`, error.stack);
            throw error;
        }
    }
};
SpeakingResponseService = SpeakingResponseService_1 = __decorate([
    Injectable(),
    __param(0, InjectModel(SpeakingResponse)),
    __metadata("design:paramtypes", [Object, DeepgramService,
        OpenaiService,
        VocabularyLevelService])
], SpeakingResponseService);
export { SpeakingResponseService };
//# sourceMappingURL=speaking-response.service.js.map