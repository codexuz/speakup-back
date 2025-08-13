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
import { ReadingAnswer } from './entities/reading-answer.entity.js';
let ReadingAnswersService = class ReadingAnswersService {
    constructor(readingAnswerModel) {
        this.readingAnswerModel = readingAnswerModel;
    }
    async create(createDto) {
        return this.readingAnswerModel.create(createDto);
    }
    async findAll() {
        return this.readingAnswerModel.findAll();
    }
    async findByReadingId(readingId) {
        return this.readingAnswerModel.findAll({
            where: { reading_id: readingId }
        });
    }
    async findOne(id) {
        const answer = await this.readingAnswerModel.findByPk(id);
        if (!answer) {
            throw new NotFoundException(`Reading answer with ID ${id} not found`);
        }
        return answer;
    }
    async update(id, updateDto) {
        const answer = await this.findOne(id);
        await answer.update(updateDto);
        return answer;
    }
    async remove(id) {
        const answer = await this.findOne(id);
        await answer.destroy();
    }
};
ReadingAnswersService = __decorate([
    Injectable(),
    __param(0, InjectModel(ReadingAnswer)),
    __metadata("design:paramtypes", [Object])
], ReadingAnswersService);
export { ReadingAnswersService };
//# sourceMappingURL=reading-answers.service.js.map