import { SpeakingPartsService } from './speaking-parts.service.js';
import { CreateSpeakingPartDto } from './dto/create-speaking-part.dto.js';
import { UpdateSpeakingPartDto } from './dto/update-speaking-part.dto.js';
export declare class SpeakingPartsController {
    private readonly service;
    constructor(service: SpeakingPartsService);
    create(dto: CreateSpeakingPartDto): Promise<import("./entities/speaking-part.entity.js").SpeakingPart>;
    findAll(): Promise<import("./entities/speaking-part.entity.js").SpeakingPart[]>;
    findByTestId(testId: string): Promise<import("./entities/speaking-part.entity.js").SpeakingPart[]>;
    findByPartType(partType: "1.1" | "1.2" | "2" | "3"): Promise<import("./entities/speaking-part.entity.js").SpeakingPart[]>;
    findOne(id: string): Promise<import("./entities/speaking-part.entity.js").SpeakingPart>;
    update(id: string, dto: UpdateSpeakingPartDto): Promise<import("./entities/speaking-part.entity.js").SpeakingPart>;
    remove(id: string): Promise<void>;
}
