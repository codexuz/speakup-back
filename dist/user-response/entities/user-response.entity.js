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
let UserResponse = class UserResponse extends Model {
};
__decorate([
    Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], UserResponse.prototype, "id", void 0);
__decorate([
    AllowNull(false),
    Column(DataType.JSONB),
    __metadata("design:type", Array)
], UserResponse.prototype, "user_answers", void 0);
__decorate([
    AllowNull(false),
    Column(DataType.UUID),
    __metadata("design:type", String)
], UserResponse.prototype, "reading_id", void 0);
__decorate([
    AllowNull(false),
    Column(DataType.UUID),
    __metadata("design:type", String)
], UserResponse.prototype, "user_id", void 0);
__decorate([
    Default(DataType.NOW),
    Column(DataType.DATE),
    __metadata("design:type", Date)
], UserResponse.prototype, "created_at", void 0);
UserResponse = __decorate([
    Table({
        tableName: "user_response",
        timestamps: false,
    })
], UserResponse);
export { UserResponse };
//# sourceMappingURL=user-response.entity.js.map