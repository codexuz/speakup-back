var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SpeakingPartsService } from './speaking-parts.service.js';
import { SpeakingPartsController } from './speaking-parts.controller.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpeakingPart } from './entities/speaking-part.entity.js';
import { AuthModule } from '../auth/auth.module.js';
let SpeakingPartsModule = class SpeakingPartsModule {
};
SpeakingPartsModule = __decorate([
    Module({
        imports: [
            SequelizeModule.forFeature([SpeakingPart]),
            AuthModule
        ],
        controllers: [SpeakingPartsController],
        providers: [SpeakingPartsService],
    })
], SpeakingPartsModule);
export { SpeakingPartsModule };
//# sourceMappingURL=speaking-parts.module.js.map