import { ConfigService } from "@nestjs/config";
export declare class OpenaiService {
    private readonly configService;
    private openai;
    private responseFormat;
    constructor(configService: ConfigService);
    assessSpeaking(userResponse: string): Promise<{
        fluency?: number;
        cefr_score?: number;
        cefr_level?: string;
        pronunciation?: number;
        grammar?: number;
        vocabulary?: number;
        fluencyFeedback?: string;
        grammarFeedback?: string;
        pronunciationFeedback?: string;
        vocabularyFeedback?: string;
        feedback?: string;
    }>;
}
