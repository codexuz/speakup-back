import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { ReadingService } from './reading.service.js';
import { CreateReadingDto } from './dto/create-reading.dto.js';
import { UpdateReadingDto } from './dto/update-reading.dto.js';

@Controller('reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createReadingDto: CreateReadingDto) {
    return this.readingService.create(createReadingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.readingService.findAll();
  }

  @Get('active')
  @UseGuards(JwtAuthGuard)
  findActive() {
    return this.readingService.findActive();
  }

  @Get('test/:testId')
  @UseGuards(JwtAuthGuard)
  findByTestId(@Param('testId') testId: string) {
    return this.readingService.findByTestId(testId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.readingService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateReadingDto: UpdateReadingDto) {
    return this.readingService.update(id, updateReadingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.readingService.remove(id);
  }
}
