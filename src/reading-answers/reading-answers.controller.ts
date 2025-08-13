import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { ReadingAnswersService } from './reading-answers.service.js';
import { CreateReadingAnswerDto } from './dto/create-reading-answer.dto.js';
import { UpdateReadingAnswerDto } from './dto/update-reading-answer.dto.js';

@Controller('reading-answers')
export class ReadingAnswersController {
  constructor(private readonly readingAnswersService: ReadingAnswersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createReadingAnswerDto: CreateReadingAnswerDto) {
    return this.readingAnswersService.create(createReadingAnswerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.readingAnswersService.findAll();
  }

  @Get('reading/:readingId')
  @UseGuards(JwtAuthGuard)
  findByReadingId(@Param('readingId') readingId: string) {
    return this.readingAnswersService.findByReadingId(readingId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.readingAnswersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateDto: UpdateReadingAnswerDto) {
    return this.readingAnswersService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.readingAnswersService.remove(id);
  }
}
