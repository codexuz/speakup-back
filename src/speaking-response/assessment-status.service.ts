import { Injectable, Inject, forwardRef, Logger } from '@nestjs/common';
import { SpeakingResponseService } from './speaking-response.service.js';

/**
 * Service for managing assessment statuses
 */
@Injectable()
export class AssessmentStatusService {
  private readonly logger = new Logger(AssessmentStatusService.name);
  
  constructor(
    @Inject(forwardRef(() => SpeakingResponseService))
    private readonly speakingResponseService: SpeakingResponseService
  ) {}
  
  /**
   * Process a single response assessment immediately
   * @param responseId The response ID to assess
   */
  async processAssessment(responseId: string): Promise<{ success: boolean; message: string }> {
    try {
      this.logger.log(`Processing immediate assessment for response ID: ${responseId}`);
      await this.speakingResponseService.assessSpeakingResponse(responseId);
      return { 
        success: true, 
        message: `Response ${responseId} assessed successfully` 
      };
    } catch (error) {
      this.logger.error(`Failed to assess response ${responseId}: ${error.message}`, error.stack);
      return { 
        success: false, 
        message: `Failed to process assessment: ${error.message}` 
      };
    }
  }
  
  /**
   * Process multiple responses for assessment immediately
   * @param responseIds An array of response IDs to assess
   */
  async processBatchAssessment(responseIds: string[]): Promise<{ 
    success: boolean; 
    message: string;
    assessed: string[];
    failed: string[];
  }> {
    const assessed = [];
    const failed = [];
    
    for (const responseId of responseIds) {
      try {
        this.logger.log(`Processing assessment for response ID: ${responseId}`);
        await this.speakingResponseService.assessSpeakingResponse(responseId);
        assessed.push(responseId);
      } catch (error) {
        this.logger.error(`Failed to assess response ${responseId}: ${error.message}`);
        failed.push(responseId);
      }
    }
    
    return {
      success: failed.length === 0,
      message: `Assessed ${assessed.length} responses, ${failed.length} failed`,
      assessed,
      failed
    };
  }
}
