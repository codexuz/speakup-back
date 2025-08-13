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
let File = class File extends Model {
};
__decorate([
    Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], File.prototype, "id", void 0);
__decorate([
    AllowNull(true),
    Column({
        type: DataType.JSONB,
    }),
    __metadata("design:type", String)
], File.prototype, "s3Key", void 0);
__decorate([
    AllowNull(true),
    Column(DataType.JSONB),
    __metadata("design:type", String)
], File.prototype, "bucket", void 0);
__decorate([
    AllowNull(true),
    Column(DataType.JSONB),
    __metadata("design:type", String)
], File.prototype, "mime", void 0);
__decorate([
    AllowNull(true),
    Column(DataType.TEXT),
    __metadata("design:type", String)
], File.prototype, "comment", void 0);
__decorate([
    Default(DataType.NOW),
    Column(DataType.DATE),
    __metadata("design:type", Date)
], File.prototype, "created_at", void 0);
File = __decorate([
    Table({
        tableName: "files",
        timestamps: false,
    })
], File);
export { File };
//# sourceMappingURL=file.entity.js.map