import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SpeakingTestsService } from './speaking-tests.service.js';
import { CreateSpeakingTestDto } from './dto/create-speaking-test.dto.js';
import { UpdateSpeakingTestDto } from './dto/update-speaking-test.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('speaking-tests')
export class SpeakingTestsController {
  constructor(private readonly service: SpeakingTestsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateSpeakingTestDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.service.findAll();
  }

  @Get('active/:status')
  @UseGuards(JwtAuthGuard)
  findByStatus(@Param('status') status: string) {
    const isActive = status === 'true';
    return this.service.findByIsActive(isActive);
  }

  @Get(':id/with-responses')
  @UseGuards(JwtAuthGuard)
  findWithResponses(@Param('id') id: string) {
    return this.service.findWithResponses(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateSpeakingTestDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
