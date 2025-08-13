var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReadingAnswersService } from './reading-answers.service.js';
import { ReadingAnswersController } from './reading-answers.controller.js';
import { ReadingAnswer } from './entities/reading-answer.entity.js';
import { AuthModule } from '../auth/auth.module.js';
let ReadingAnswersModule = class ReadingAnswersModule {
};
ReadingAnswersModule = __decorate([
    Module({
        imports: [
            SequelizeModule.forFeature([ReadingAnswer]),
            AuthModule
        ],
        controllers: [ReadingAnswersController],
        providers: [ReadingAnswersService],
        exports: [ReadingAnswersService]
    })
], ReadingAnswersModule);
export { ReadingAnswersModule };
//# sourceMappingURL=reading-answers.module.js.map