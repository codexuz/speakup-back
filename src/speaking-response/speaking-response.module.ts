import { Module } from "@nestjs/common";
import { SpeakingResponseService } from "./speaking-response.service.js";
import { SpeakingResponseController } from "./speaking-response.controller.js";
import { SequelizeModule } from "@nestjs/sequelize";
import { SpeakingResponse } from "./entities/speaking-response.entity.js";
import { AuthModule } from "../auth/auth.module.js";
import { DeepgramModule } from "../deepgram/deepgram.module.js";
import { OpenaiModule } from "../openai/openai.module.js";
import { VocabularyLevelModule } from "../vocabulary-level/vocabulary-level.module.js";
import { MyPurchasedTestsModule } from "../my-purchased-tests/my-purchased-tests.module.js";
import { SpeakingPartsModule } from "../speaking-parts/speaking-parts.module.js";
import { AssessmentStatusService } from "./assessment-status.service.js";

@Module({
  imports: [
    SequelizeModule.forFeature([SpeakingResponse]),
    AuthModule,
    DeepgramModule,
    OpenaiModule,
    VocabularyLevelModule,
    MyPurchasedTestsModule,
    SpeakingPartsModule,
  ],
  controllers: [SpeakingResponseController],
  providers: [SpeakingResponseService, AssessmentStatusService],
  exports: [SpeakingResponseService],
})
export class SpeakingResponseModule {}
