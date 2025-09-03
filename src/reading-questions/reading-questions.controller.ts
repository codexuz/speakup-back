import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { ReadingQuestionsService } from './reading-questions.service.js';
import { CreateReadingQuestionDto } from './dto/create-reading-question.dto.js';
import { UpdateReadingQuestionDto } from './dto/update-reading-question.dto.js';

@Controller('reading-questions')
export class ReadingQuestionsController {
  constructor(private readonly readingQuestionsService: ReadingQuestionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDto: CreateReadingQuestionDto) {
    return this.readingQuestionsService.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.readingQuestionsService.findAll();
  }

  @Get('text/:textId')
  @UseGuards(JwtAuthGuard)
  findByReadingTextId(@Param('textId') textId: string) {
    return this.readingQuestionsService.findByReadingTextId(textId);
  }

  @Get('part/:part')
  @UseGuards(JwtAuthGuard)
  findByPart(@Param('part') part: string) {
    return this.readingQuestionsService.findByPart(part);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.readingQuestionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateDto: UpdateReadingQuestionDto) {
    return this.readingQuestionsService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.readingQuestionsService.remove(id);
  }
}
