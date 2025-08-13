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
let ReadingQuestion = class ReadingQuestion extends Model {
};
__decorate([
    Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], ReadingQuestion.prototype, "id", void 0);
__decorate([
    AllowNull(false),
    Column(DataType.JSONB),
    __metadata("design:type", Object)
], ReadingQuestion.prototype, "content", void 0);
__decorate([
    AllowNull(false),
    Column(DataType.ENUM('part1', 'part2', 'part3', 'part4', 'part5')),
    __metadata("design:type", String)
], ReadingQuestion.prototype, "part", void 0);
__decorate([
    AllowNull(false),
    Column(DataType.UUID),
    __metadata("design:type", String)
], ReadingQuestion.prototype, "reading_text_id", void 0);
__decorate([
    Default(DataType.NOW),
    Column(DataType.DATE),
    __metadata("design:type", Date)
], ReadingQuestion.prototype, "created_at", void 0);
ReadingQuestion = __decorate([
    Table({
        tableName: "reading_questions",
        timestamps: false,
    })
], ReadingQuestion);
export { ReadingQuestion };
//# sourceMappingURL=reading-question.entity.js.map