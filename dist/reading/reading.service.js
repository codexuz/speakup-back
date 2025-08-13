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
import { Reading } from './entities/reading.entity.js';
let ReadingService = class ReadingService {
    constructor(readingModel) {
        this.readingModel = readingModel;
    }
    async create(createReadingDto) {
        return this.readingModel.create(createReadingDto);
    }
    async findAll() {
        return this.readingModel.findAll();
    }
    async findByTestId(testId) {
        return this.readingModel.findAll({
            where: { test_id: testId }
        });
    }
    async findActive() {
        return this.readingModel.findAll({
            where: { isActive: true }
        });
    }
    async findOne(id) {
        const reading = await this.readingModel.findByPk(id);
        if (!reading) {
            throw new NotFoundException(`Reading passage with ID ${id} not found`);
        }
        return reading;
    }
    async update(id, updateReadingDto) {
        const reading = await this.findOne(id);
        await reading.update(updateReadingDto);
        return reading;
    }
    async remove(id) {
        const reading = await this.findOne(id);
        await reading.destroy();
    }
};
ReadingService = __decorate([
    Injectable(),
    __param(0, InjectModel(Reading)),
    __metadata("design:paramtypes", [Object])
], ReadingService);
export { ReadingService };
//# sourceMappingURL=reading.service.js.map