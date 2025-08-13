import { SpeakingResponseService } from './speaking-response.service.js';
export declare class AssessmentStatusService {
    private readonly speakingResponseService;
    private readonly logger;
    constructor(speakingResponseService: SpeakingResponseService);
    processAssessment(responseId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    processBatchAssessment(responseIds: string[]): Promise<{
        success: boolean;
        message: string;
        assessed: string[];
        failed: string[];
    }>;
}
