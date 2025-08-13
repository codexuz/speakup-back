import { SpeakingTests } from './entities/speaking-test.entity.js';
import { CreateSpeakingTestDto } from './dto/create-speaking-test.dto.js';
import { UpdateSpeakingTestDto } from './dto/update-speaking-test.dto.js';
export declare class SpeakingTestsService {
    private speakingTestModel;
    constructor(speakingTestModel: typeof SpeakingTests);
    create(createDto: CreateSpeakingTestDto): Promise<SpeakingTests>;
    findAll(): Promise<SpeakingTests[]>;
    findOne(id: string): Promise<SpeakingTests>;
    findWithResponses(id: string): Promise<SpeakingTests>;
    findByIsActive(isActive: boolean): Promise<SpeakingTests[]>;
    update(id: string, updateDto: UpdateSpeakingTestDto): Promise<SpeakingTests>;
    remove(id: string): Promise<void>;
}
