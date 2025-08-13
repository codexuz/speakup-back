import { SpeakingResponse } from './entities/speaking-response.entity.js';
import { CreateSpeakingResponseDto } from './dto/create-speaking-response.dto.js';
import { UpdateSpeakingResponseDto } from './dto/update-speaking-response.dto.js';
import { DeepgramService } from '../deepgram/deepgram.service.js';
import { OpenaiService } from '../openai/openai.service.js';
import { VocabularyLevelService } from '../vocabulary-level/vocabulary-level.service.js';
export declare class SpeakingResponseService {
    private speakingResponseModel;
    private readonly deepgramService;
    private readonly openaiService;
    private readonly vocabularyLevelService;
    private readonly logger;
    constructor(speakingResponseModel: typeof SpeakingResponse, deepgramService: DeepgramService, openaiService: OpenaiService, vocabularyLevelService: VocabularyLevelService);
    create(createDto: CreateSpeakingResponseDto): Promise<SpeakingResponse>;
    findAll(): Promise<SpeakingResponse[]>;
    findOne(id: string): Promise<SpeakingResponse>;
    findByUserId(userId: string): Promise<SpeakingResponse[]>;
    findByTestId(testId: string): Promise<SpeakingResponse[]>;
    findByUserAndTest(userId: string, testId: string): Promise<SpeakingResponse[]>;
    update(id: string, updateDto: UpdateSpeakingResponseDto): Promise<SpeakingResponse>;
    remove(id: string): Promise<void>;
    assessSpeakingResponse(responseId: string): Promise<any>;
    batchAssessSpeakingResponses(userId: string, testId?: string): Promise<any[]>;
}
