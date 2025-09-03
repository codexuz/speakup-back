import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { ReadingPassagesService } from './reading-passages.service.js';
import { CreateReadingPassageDto } from './dto/create-reading-passage.dto.js';
import { UpdateReadingPassageDto } from './dto/update-reading-passage.dto.js';

@Controller('reading-passages')
export class ReadingPassagesController {
  constructor(private readonly readingPassagesService: ReadingPassagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDto: CreateReadingPassageDto) {
    return this.readingPassagesService.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.readingPassagesService.findAll();
  }

  @Get('reading/:readingId')
  @UseGuards(JwtAuthGuard)
  findByReadingId(@Param('readingId') readingId: string) {
    return this.readingPassagesService.findByReadingId(readingId);
  }

  @Get('part/:part')
  @UseGuards(JwtAuthGuard)
  findByPart(@Param('part') part: string) {
    return this.readingPassagesService.findByPart(part);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.readingPassagesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateDto: UpdateReadingPassageDto) {
    return this.readingPassagesService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.readingPassagesService.remove(id);
  }
}
