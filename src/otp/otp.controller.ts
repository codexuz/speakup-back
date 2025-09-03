import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OtpService } from './otp.service.js';
import { CreateOtpDto } from './dto/create-otp.dto.js';
import { UpdateOtpDto } from './dto/update-otp.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('otp')
export class OtpController {
  constructor(private readonly service: OtpService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateOtpDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateOtpDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
