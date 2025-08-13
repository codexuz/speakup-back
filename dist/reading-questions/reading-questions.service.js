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
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReadingQuestion } from './entities/reading-question.entity.js';
let ReadingQuestionsService = class ReadingQuestionsService {
    constructor(readingQuestionModel) {
        this.readingQuestionModel = readingQuestionModel;
    }
    async create(createDto) {
        return this.readingQuestionModel.create(createDto);
    }
    async findAll() {
        return this.readingQuestionModel.findAll();
    }
    async findByReadingTextId(readingTextId) {
        return this.readingQuestionModel.findAll({
            where: { reading_text_id: readingTextId }
        });
    }
    async findByPart(part) {
        return this.readingQuestionModel.findAll({
            where: { part }
        });
    }
    async findOne(id) {
        const question = await this.readingQuestionModel.findByPk(id);
        if (!question) {
            throw new NotFoundException(`Reading question with ID ${id} not found`);
        }
        return question;
    }
    async update(id, updateDto) {
        const question = await this.findOne(id);
        await question.update(updateDto);
        return question;
    }
    async remove(id) {
        const question = await this.findOne(id);
        await question.destroy();
    }
};
ReadingQuestionsService = __decorate([
    Injectable(),
    __param(0, InjectModel(ReadingQuestion)),
    __metadata("design:paramtypes", [Object])
], ReadingQuestionsService);
export { ReadingQuestionsService };
//# sourceMappingURL=reading-questions.service.js.map