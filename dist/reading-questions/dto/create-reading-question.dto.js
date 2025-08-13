var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEnum, IsNotEmpty, IsObject, IsUUID } from 'class-validator';
export class CreateReadingQuestionDto {
}
__decorate([
    IsNotEmpty(),
    IsObject(),
    __metadata("design:type", Object)
], CreateReadingQuestionDto.prototype, "content", void 0);
__decorate([
    IsNotEmpty(),
    IsEnum(['part1', 'part2', 'part3', 'part4', 'part5']),
    __metadata("design:type", String)
], CreateReadingQuestionDto.prototype, "part", void 0);
__decorate([
    IsNotEmpty(),
    IsUUID(),
    __metadata("design:type", String)
], CreateReadingQuestionDto.prototype, "reading_text_id", void 0);
//# sourceMappingURL=create-reading-question.dto.js.map