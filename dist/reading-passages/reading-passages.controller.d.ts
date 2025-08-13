import { ReadingPassagesService } from './reading-passages.service.js';
import { CreateReadingPassageDto } from './dto/create-reading-passage.dto.js';
import { UpdateReadingPassageDto } from './dto/update-reading-passage.dto.js';
export declare class ReadingPassagesController {
    private readonly readingPassagesService;
    constructor(readingPassagesService: ReadingPassagesService);
    create(createDto: CreateReadingPassageDto): Promise<import("./entities/reading-passage.entity.js").ReadingPassages>;
    findAll(): Promise<import("./entities/reading-passage.entity.js").ReadingPassages[]>;
    findByReadingId(readingId: string): Promise<import("./entities/reading-passage.entity.js").ReadingPassages[]>;
    findByPart(part: string): Promise<import("./entities/reading-passage.entity.js").ReadingPassages[]>;
    findOne(id: string): Promise<import("./entities/reading-passage.entity.js").ReadingPassages>;
    update(id: string, updateDto: UpdateReadingPassageDto): Promise<import("./entities/reading-passage.entity.js").ReadingPassages>;
    remove(id: string): Promise<void>;
}
