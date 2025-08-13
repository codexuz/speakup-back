import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { UserResponseService } from './user-response.service.js';
import { CreateUserResponseDto } from './dto/create-user-response.dto.js';
import { UpdateUserResponseDto } from './dto/update-user-response.dto.js';

@Controller('user-response')
export class UserResponseController {
  constructor(private readonly userResponseService: UserResponseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDto: CreateUserResponseDto) {
    return this.userResponseService.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userResponseService.findAll();
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  findByUserId(@Param('userId') userId: string) {
    return this.userResponseService.findByUserId(userId);
  }

  @Get('reading/:readingId')
  @UseGuards(JwtAuthGuard)
  findByReadingId(@Param('readingId') readingId: string) {
    return this.userResponseService.findByReadingId(readingId);
  }

  @Get('user/:userId/reading/:readingId')
  @UseGuards(JwtAuthGuard)
  findByUserAndReading(
    @Param('userId') userId: string,
    @Param('readingId') readingId: string
  ) {
    return this.userResponseService.findByUserAndReading(userId, readingId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userResponseService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateDto: UpdateUserResponseDto) {
    return this.userResponseService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userResponseService.remove(id);
  }
}
