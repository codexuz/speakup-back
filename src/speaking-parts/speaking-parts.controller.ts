import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SpeakingPartsService } from './speaking-parts.service.js';
import { CreateSpeakingPartDto } from './dto/create-speaking-part.dto.js';
import { UpdateSpeakingPartDto } from './dto/update-speaking-part.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('speaking-parts')
export class SpeakingPartsController {
  constructor(private readonly service: SpeakingPartsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateSpeakingPartDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.service.findAll();
  }

  @Get('test/:testId')
  @UseGuards(JwtAuthGuard)
  findByTestId(@Param('testId') testId: string) {
    return this.service.findByTestId(testId);
  }

  @Get('part-type/:partType')
  @UseGuards(JwtAuthGuard)
  findByPartType(@Param('partType') partType: "1.1" | "1.2" | "2" | "3") {
    return this.service.findByPartType(partType);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateSpeakingPartDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
