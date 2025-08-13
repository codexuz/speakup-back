var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReadingService } from './reading.service.js';
import { ReadingController } from './reading.controller.js';
import { Reading } from './entities/reading.entity.js';
import { AuthModule } from '../auth/auth.module.js';
let ReadingModule = class ReadingModule {
};
ReadingModule = __decorate([
    Module({
        imports: [
            SequelizeModule.forFeature([Reading]),
            AuthModule
        ],
        controllers: [ReadingController],
        providers: [ReadingService],
        exports: [ReadingService]
    })
], ReadingModule);
export { ReadingModule };
//# sourceMappingURL=reading.module.js.map