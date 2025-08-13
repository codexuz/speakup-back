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
import { SpeakingTests } from './entities/speaking-test.entity.js';
import { SpeakingPart } from '../speaking-parts/entities/speaking-part.entity.js';
import { SpeakingResponse } from '../speaking-response/entities/speaking-response.entity.js';
let SpeakingTestsService = class SpeakingTestsService {
    constructor(speakingTestModel) {
        this.speakingTestModel = speakingTestModel;
    }
    async create(createDto) {
        return this.speakingTestModel.create(createDto);
    }
    async findAll() {
        return this.speakingTestModel.findAll({
            include: [SpeakingPart]
        });
    }
    async findOne(id) {
        const test = await this.speakingTestModel.findByPk(id, {
            include: [SpeakingPart]
        });
        if (!test)
            throw new NotFoundException('Speaking test not found');
        return test;
    }
    async findWithResponses(id) {
        const test = await this.speakingTestModel.findByPk(id, {
            include: [SpeakingPart, SpeakingResponse]
        });
        if (!test)
            throw new NotFoundException('Speaking test not found');
        return test;
    }
    async findByIsActive(isActive) {
        return this.speakingTestModel.findAll({
            where: { isActive },
            include: [SpeakingPart]
        });
    }
    async update(id, updateDto) {
        const test = await this.findOne(id);
        await test.update(updateDto);
        return test;
    }
    async remove(id) {
        const test = await this.findOne(id);
        await test.destroy();
    }
};
SpeakingTestsService = __decorate([
    Injectable(),
    __param(0, InjectModel(SpeakingTests)),
    __metadata("design:paramtypes", [Object])
], SpeakingTestsService);
export { SpeakingTestsService };
//# sourceMappingURL=speaking-tests.service.js.map