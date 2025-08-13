var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, AllowNull, Default, } from 'sequelize-typescript';
let SpeakingTests = class SpeakingTests extends Model {
};
__decorate([
    Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], SpeakingTests.prototype, "id", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING(50),
        validate: {
            notEmpty: true,
        },
    }),
    __metadata("design:type", String)
], SpeakingTests.prototype, "title", void 0);
__decorate([
    AllowNull(false),
    Column(DataType.TEXT),
    __metadata("design:type", String)
], SpeakingTests.prototype, "description", void 0);
__decorate([
    Default(DataType.NOW),
    Column(DataType.DATE),
    __metadata("design:type", Date)
], SpeakingTests.prototype, "created_at", void 0);
__decorate([
    Column({
        type: DataType.BOOLEAN,
        allowNull: true
    }),
    __metadata("design:type", Boolean)
], SpeakingTests.prototype, "isActive", void 0);
SpeakingTests = __decorate([
    Table({
        tableName: 'speaking_tests',
        timestamps: false,
    })
], SpeakingTests);
export { SpeakingTests };
//# sourceMappingURL=speaking-test.entity.js.map