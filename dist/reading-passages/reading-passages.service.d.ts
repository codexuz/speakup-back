import { ReadingPassages } from './entities/reading-passage.entity.js';
import { CreateReadingPassageDto } from './dto/create-reading-passage.dto.js';
import { UpdateReadingPassageDto } from './dto/update-reading-passage.dto.js';
export declare class ReadingPassagesService {
    private readonly readingPassagesModel;
    constructor(readingPassagesModel: typeof ReadingPassages);
    create(createDto: CreateReadingPassageDto): Promise<ReadingPassages>;
    findAll(): Promise<ReadingPassages[]>;
    findByReadingId(readingId: string): Promise<ReadingPassages[]>;
    findByPart(part: string): Promise<ReadingPassages[]>;
    findOne(id: string): Promise<ReadingPassages>;
    update(id: string, updateDto: UpdateReadingPassageDto): Promise<ReadingPassages>;
    remove(id: string): Promise<void>;
}
