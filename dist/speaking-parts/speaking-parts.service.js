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
import { SpeakingPart } from './entities/speaking-part.entity.js';
import { SpeakingTests } from '../speaking-tests/entities/speaking-test.entity.js';
let SpeakingPartsService = class SpeakingPartsService {
    constructor(speakingPartModel) {
        this.speakingPartModel = speakingPartModel;
    }
    async create(createDto) {
        return this.speakingPartModel.create(createDto);
    }
    async findAll() {
        return this.speakingPartModel.findAll({
            include: [SpeakingTests]
        });
    }
    async findOne(id) {
        const part = await this.speakingPartModel.findByPk(id, {
            include: [SpeakingTests]
        });
        if (!part)
            throw new NotFoundException('Speaking part not found');
        return part;
    }
    async findByTestId(testId) {
        return this.speakingPartModel.findAll({
            where: { test_id: testId },
            include: [SpeakingTests]
        });
    }
    async findByPartType(partType) {
        return this.speakingPartModel.findAll({
            where: { part: partType },
            include: [SpeakingTests]
        });
    }
    async update(id, updateDto) {
        const part = await this.findOne(id);
        await part.update(updateDto);
        return part;
    }
    async remove(id) {
        const part = await this.findOne(id);
        await part.destroy();
    }
};
SpeakingPartsService = __decorate([
    Injectable(),
    __param(0, InjectModel(SpeakingPart)),
    __metadata("design:paramtypes", [Object])
], SpeakingPartsService);
export { SpeakingPartsService };
//# sourceMappingURL=speaking-parts.service.js.map