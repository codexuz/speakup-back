import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SpeakingResponseService } from './speaking-response.service.js';
import { CreateSpeakingResponseDto } from './dto/create-speaking-response.dto.js';
import { UpdateSpeakingResponseDto } from './dto/update-speaking-response.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AssessmentStatusService } from './assessment-status.service.js';

@Controller('speaking-response')
export class SpeakingResponseController {
  constructor(
    private readonly service: SpeakingResponseService,
    private readonly assessmentStatusService: AssessmentStatusService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateSpeakingResponseDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.service.findAll();
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  findByUserId(@Param('userId') userId: string) {
    return this.service.findByUserId(userId);
  }

  @Get('test/:testId')
  @UseGuards(JwtAuthGuard)
  findByTestId(@Param('testId') testId: string) {
    return this.service.findByTestId(testId);
  }


  @Get('user/:userId/test/:testId')
  @UseGuards(JwtAuthGuard)
  findByUserAndTest(
    @Param('userId') userId: string,
    @Param('testId') testId: string
  ) {
    return this.service.findByUserAndTest(userId, testId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateSpeakingResponseDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('assess/:id')
  @UseGuards(JwtAuthGuard)
  assessSpeakingResponse(@Param('id') id: string) {
    // Process the assessment immediately
    return this.assessmentStatusService.processAssessment(id);
  }
  
  @Get('assessment/:id/status')
  @UseGuards(JwtAuthGuard)
  async getAssessmentStatus(@Param('id') id: string) {
    const response = await this.service.findOne(id);
    if (!response) {
      return { status: 'not_found', message: 'Speaking response not found' };
    }
    
    const responseData = response.response as Record<string, any>;
    
    if (responseData && responseData['assessment']) {
      return { 
        status: 'completed', 
        assessedAt: responseData['assessment'].timestamp,
        hasTranscript: !!response.transcript,
      };
    }
    
    // No more 'queued' status since we process immediately
    return { status: 'not_assessed' };
  }

  @Post('assess-batch/user/:userId')
  @UseGuards(JwtAuthGuard)
  async batchAssessByUser(@Param('userId') userId: string) {
    // Get all response IDs for this user
    const responses = await this.service.findByUserId(userId);
    const responseIds = responses.map(response => response.id);
    
    // Process all assessments immediately
    return this.assessmentStatusService.processBatchAssessment(responseIds);
  }

  @Post('assess-batch/user/:userId/test/:testId')
  @UseGuards(JwtAuthGuard)
  async batchAssessByUserAndTest(
    @Param('userId') userId: string,
    @Param('testId') testId: string
  ) {
    // Get all response IDs for this user and test
    const responses = await this.service.findByUserAndTest(userId, testId);
    const responseIds = responses.map(response => response.id);
    
    // Process all assessments immediately
    return this.assessmentStatusService.processBatchAssessment(responseIds);
  }
}
