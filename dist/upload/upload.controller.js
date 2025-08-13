var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, UploadedFile, UseInterceptors, Get, Delete, Param, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service.js';
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    uploadFile(file) {
        const fileUrl = this.uploadService.getFileUrl(file.filename);
        return {
            originalName: file.originalname,
            filename: file.filename,
            path: file.path,
            url: fileUrl,
        };
    }
    async getAllFiles() {
        return this.uploadService.getAllFiles();
    }
    async deleteFile(filename) {
        return this.uploadService.deleteFile(filename);
    }
};
__decorate([
    Post(),
    UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        limits: { fileSize: 50 * 1024 * 1024 },
    })),
    __param(0, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadFile", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getAllFiles", null);
__decorate([
    Delete(':filename'),
    __param(0, Param('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "deleteFile", null);
UploadController = __decorate([
    Controller('upload'),
    __metadata("design:paramtypes", [UploadService])
], UploadController);
export { UploadController };
//# sourceMappingURL=upload.controller.js.map