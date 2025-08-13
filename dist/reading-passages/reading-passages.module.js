var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReadingPassagesService } from './reading-passages.service.js';
import { ReadingPassagesController } from './reading-passages.controller.js';
import { ReadingPassages } from './entities/reading-passage.entity.js';
import { AuthModule } from '../auth/auth.module.js';
let ReadingPassagesModule = class ReadingPassagesModule {
};
ReadingPassagesModule = __decorate([
    Module({
        imports: [
            SequelizeModule.forFeature([ReadingPassages]),
            AuthModule
        ],
        controllers: [ReadingPassagesController],
        providers: [ReadingPassagesService],
        exports: [ReadingPassagesService]
    })
], ReadingPassagesModule);
export { ReadingPassagesModule };
//# sourceMappingURL=reading-passages.module.js.map