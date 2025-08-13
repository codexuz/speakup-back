import { SpeakingResponseService } from './speaking-response.service.js';
import { CreateSpeakingResponseDto } from './dto/create-speaking-response.dto.js';
import { UpdateSpeakingResponseDto } from './dto/update-speaking-response.dto.js';
import { AssessmentStatusService } from './assessment-status.service.js';
export declare class SpeakingResponseController {
    private readonly service;
    private readonly assessmentStatusService;
    constructor(service: SpeakingResponseService, assessmentStatusService: AssessmentStatusService);
    create(dto: CreateSpeakingResponseDto): Promise<import("./entities/speaking-response.entity.js").SpeakingResponse>;
    findAll(): Promise<import("./entities/speaking-response.entity.js").SpeakingResponse[]>;
    findByUserId(userId: string): Promise<import("./entities/speaking-response.entity.js").SpeakingResponse[]>;
    findByTestId(testId: string): Promise<import("./entities/speaking-response.entity.js").SpeakingResponse[]>;
    findByUserAndTest(userId: string, testId: string): Promise<import("./entities/speaking-response.entity.js").SpeakingResponse[]>;
    findOne(id: string): Promise<import("./entities/speaking-response.entity.js").SpeakingResponse>;
    update(id: string, dto: UpdateSpeakingResponseDto): Promise<import("./entities/speaking-response.entity.js").SpeakingResponse>;
    remove(id: string): Promise<void>;
    assessSpeakingResponse(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getAssessmentStatus(id: string): Promise<{
        status: string;
        message: string;
        assessedAt?: undefined;
        hasTranscript?: undefined;
    } | {
        status: string;
        assessedAt: any;
        hasTranscript: boolean;
        message?: undefined;
    } | {
        status: string;
        message?: undefined;
        assessedAt?: undefined;
        hasTranscript?: undefined;
    }>;
    batchAssessByUser(userId: string): Promise<{
        success: boolean;
        message: string;
        assessed: string[];
        failed: string[];
    }>;
    batchAssessByUserAndTest(userId: string, testId: string): Promise<{
        success: boolean;
        message: string;
        assessed: string[];
        failed: string[];
    }>;
}
