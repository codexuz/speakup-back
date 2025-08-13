var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
export class CreateReadingDto {
    constructor() {
        this.isActive = true;
    }
}
__decorate([
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateReadingDto.prototype, "title", void 0);
__decorate([
    IsNotEmpty(),
    IsUUID(),
    __metadata("design:type", String)
], CreateReadingDto.prototype, "test_id", void 0);
__decorate([
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], CreateReadingDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-reading.dto.js.map