import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';


import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';

/* Models   */

import { SpeakingTestsModule } from './speaking-tests/speaking-tests.module.js';
import { SpeakingResponseModule } from './speaking-response/speaking-response.module.js';
import { SpeakingPartsModule } from './speaking-parts/speaking-parts.module.js';
import { OtpModule } from './otp/otp.module.js';

import { Models, associateModels } from './models/index.js';
import { FilesModule } from './files/files.module.js';
import { DeepgramModule } from './deepgram/deepgram.module.js';
import { OpenaiModule } from './openai/openai.module.js';
import { VocabularyLevelModule } from './vocabulary-level/vocabulary-level.module.js';
import { UploadModule } from './upload/upload.module.js';
import { ReadingModule } from './reading/reading.module.js';
import { ReadingPassagesModule } from './reading-passages/reading-passages.module.js';
import { ReadingQuestionsModule } from './reading-questions/reading-questions.module.js';
import { UserResponseModule } from './user-response/user-response.module.js';
import { ReadingAnswersModule } from './reading-answers/reading-answers.module.js';
import { TestsModule } from './tests/tests.module.js';
import { MyPurchasedTestsModule } from './my-purchased-tests/my-purchased-tests.module.js';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
     SequelizeModule.forRoot({
      dialect: "postgres",
      uri: "postgresql://postgres.bkxhwaeluswfwfxavmpt:Jackyshow_98@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
      sync: { alter: false },
      models: [...Models],
      autoLoadModels: true,
      logging: true,
    }),
    AuthModule,
    UsersModule,
    SpeakingTestsModule,
    SpeakingPartsModule,
    SpeakingResponseModule,
    OtpModule,
    FilesModule,
    DeepgramModule,
    OpenaiModule,
    VocabularyLevelModule,
    UploadModule,
    ReadingModule,
    ReadingPassagesModule,
    ReadingQuestionsModule,
    UserResponseModule,
    ReadingAnswersModule,
    TestsModule,
    MyPurchasedTestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    associateModels();
  }
}
