import { ReadingService } from './reading.service.js';
import { CreateReadingDto } from './dto/create-reading.dto.js';
import { UpdateReadingDto } from './dto/update-reading.dto.js';
export declare class ReadingController {
    private readonly readingService;
    constructor(readingService: ReadingService);
    create(createReadingDto: CreateReadingDto): Promise<import("./entities/reading.entity.js").Reading>;
    findAll(): Promise<import("./entities/reading.entity.js").Reading[]>;
    findActive(): Promise<import("./entities/reading.entity.js").Reading[]>;
    findByTestId(testId: string): Promise<import("./entities/reading.entity.js").Reading[]>;
    findOne(id: string): Promise<import("./entities/reading.entity.js").Reading>;
    update(id: string, updateReadingDto: UpdateReadingDto): Promise<import("./entities/reading.entity.js").Reading>;
    remove(id: string): Promise<void>;
}
