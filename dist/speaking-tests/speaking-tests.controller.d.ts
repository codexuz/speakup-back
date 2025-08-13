import { SpeakingTestsService } from './speaking-tests.service.js';
import { CreateSpeakingTestDto } from './dto/create-speaking-test.dto.js';
import { UpdateSpeakingTestDto } from './dto/update-speaking-test.dto.js';
export declare class SpeakingTestsController {
    private readonly service;
    constructor(service: SpeakingTestsService);
    create(dto: CreateSpeakingTestDto): Promise<import("./entities/speaking-test.entity.js").SpeakingTests>;
    findAll(): Promise<import("./entities/speaking-test.entity.js").SpeakingTests[]>;
    findByStatus(status: string): Promise<import("./entities/speaking-test.entity.js").SpeakingTests[]>;
    findWithResponses(id: string): Promise<import("./entities/speaking-test.entity.js").SpeakingTests>;
    findOne(id: string): Promise<import("./entities/speaking-test.entity.js").SpeakingTests>;
    update(id: string, dto: UpdateSpeakingTestDto): Promise<import("./entities/speaking-test.entity.js").SpeakingTests>;
    remove(id: string): Promise<void>;
}
