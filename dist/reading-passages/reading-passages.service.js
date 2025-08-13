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
import { ReadingPassages } from './entities/reading-passage.entity.js';
let ReadingPassagesService = class ReadingPassagesService {
    constructor(readingPassagesModel) {
        this.readingPassagesModel = readingPassagesModel;
    }
    async create(createDto) {
        return this.readingPassagesModel.create(createDto);
    }
    async findAll() {
        return this.readingPassagesModel.findAll();
    }
    async findByReadingId(readingId) {
        return this.readingPassagesModel.findAll({
            where: { reading_id: readingId }
        });
    }
    async findByPart(part) {
        return this.readingPassagesModel.findAll({
            where: { part }
        });
    }
    async findOne(id) {
        const passage = await this.readingPassagesModel.findByPk(id);
        if (!passage) {
            throw new NotFoundException(`Reading passage with ID ${id} not found`);
        }
        return passage;
    }
    async update(id, updateDto) {
        const passage = await this.findOne(id);
        await passage.update(updateDto);
        return passage;
    }
    async remove(id) {
        const passage = await this.findOne(id);
        await passage.destroy();
    }
};
ReadingPassagesService = __decorate([
    Injectable(),
    __param(0, InjectModel(ReadingPassages)),
    __metadata("design:paramtypes", [Object])
], ReadingPassagesService);
export { ReadingPassagesService };
//# sourceMappingURL=reading-passages.service.js.map