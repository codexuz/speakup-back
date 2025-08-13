var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SpeakingResponseService } from './speaking-response.service.js';
import { SpeakingResponseController } from './speaking-response.controller.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpeakingResponse } from './entities/speaking-response.entity.js';
import { AuthModule } from '../auth/auth.module.js';
import { DeepgramModule } from '../deepgram/deepgram.module.js';
import { OpenaiModule } from '../openai/openai.module.js';
import { VocabularyLevelModule } from '../vocabulary-level/vocabulary-level.module.js';
import { AssessmentStatusService } from './assessment-status.service.js';
let SpeakingResponseModule = class SpeakingResponseModule {
};
SpeakingResponseModule = __decorate([
    Module({
        imports: [
            SequelizeModule.forFeature([SpeakingResponse]),
            AuthModule,
            DeepgramModule,
            OpenaiModule,
            VocabularyLevelModule
        ],
        controllers: [SpeakingResponseController],
        providers: [SpeakingResponseService, AssessmentStatusService],
        exports: [SpeakingResponseService]
    })
], SpeakingResponseModule);
export { SpeakingResponseModule };
//# sourceMappingURL=speaking-response.module.js.map