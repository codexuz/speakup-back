import { Reading } from './entities/reading.entity.js';
import { CreateReadingDto } from './dto/create-reading.dto.js';
import { UpdateReadingDto } from './dto/update-reading.dto.js';
export declare class ReadingService {
    private readonly readingModel;
    constructor(readingModel: typeof Reading);
    create(createReadingDto: CreateReadingDto): Promise<Reading>;
    findAll(): Promise<Reading[]>;
    findByTestId(testId: string): Promise<Reading[]>;
    findActive(): Promise<Reading[]>;
    findOne(id: string): Promise<Reading>;
    update(id: string, updateReadingDto: UpdateReadingDto): Promise<Reading>;
    remove(id: string): Promise<void>;
}
