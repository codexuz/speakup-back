var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, AllowNull, Default, } from "sequelize-typescript";
let SpeakingResponse = class SpeakingResponse extends Model {
};
__decorate([
    Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], SpeakingResponse.prototype, "id", void 0);
__decorate([
    AllowNull(true),
    Column(DataType.TEXT),
    __metadata("design:type", String)
], SpeakingResponse.prototype, "transcript", void 0);
__decorate([
    AllowNull(true),
    Column(DataType.TEXT),
    __metadata("design:type", String)
], SpeakingResponse.prototype, "audio_url", void 0);
__decorate([
    AllowNull(true),
    Column(DataType.JSONB),
    __metadata("design:type", Object)
], SpeakingResponse.prototype, "response", void 0);
__decorate([
    AllowNull(false),
    Column(DataType.UUID),
    __metadata("design:type", String)
], SpeakingResponse.prototype, "user_id", void 0);
__decorate([
    AllowNull(false),
    Column(DataType.UUID),
    __metadata("design:type", String)
], SpeakingResponse.prototype, "test_id", void 0);
__decorate([
    Default(DataType.NOW),
    Column(DataType.DATE),
    __metadata("design:type", Date)
], SpeakingResponse.prototype, "created_at", void 0);
SpeakingResponse = __decorate([
    Table({
        tableName: "speaking_response",
        timestamps: false,
    })
], SpeakingResponse);
export { SpeakingResponse };
//# sourceMappingURL=speaking-response.entity.js.map