import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TestsService } from './tests.service.js';
import { CreateTestDto } from './dto/create-test.dto.js';
import { UpdateTestDto } from './dto/update-test.dto.js';
import { Test } from './entities/test.entity.js';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTestDto: CreateTestDto): Promise<Test> {
    return await this.testsService.create(createTestDto);
  }

  @Get()
  async findAll(): Promise<Test[]> {
    return await this.testsService.findAll();
  }

  @Get('published')
  async findPublished(): Promise<Test[]> {
    return await this.testsService.findPublished();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Test> {
    return await this.testsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateTestDto: UpdateTestDto
  ): Promise<Test> {
    return await this.testsService.update(id, updateTestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.testsService.remove(id);
  }
}
