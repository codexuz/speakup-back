import { SpeakingPart } from './entities/speaking-part.entity.js';
import { CreateSpeakingPartDto } from './dto/create-speaking-part.dto.js';
import { UpdateSpeakingPartDto } from './dto/update-speaking-part.dto.js';
export declare class SpeakingPartsService {
    private speakingPartModel;
    constructor(speakingPartModel: typeof SpeakingPart);
    create(createDto: CreateSpeakingPartDto): Promise<SpeakingPart>;
    findAll(): Promise<SpeakingPart[]>;
    findOne(id: string): Promise<SpeakingPart>;
    findByTestId(testId: string): Promise<SpeakingPart[]>;
    findByPartType(partType: "1.1" | "1.2" | "2" | "3"): Promise<SpeakingPart[]>;
    update(id: string, updateDto: UpdateSpeakingPartDto): Promise<SpeakingPart>;
    remove(id: string): Promise<void>;
}
