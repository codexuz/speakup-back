import { ReadingAnswer } from './entities/reading-answer.entity.js';
import { CreateReadingAnswerDto } from './dto/create-reading-answer.dto.js';
import { UpdateReadingAnswerDto } from './dto/update-reading-answer.dto.js';
export declare class ReadingAnswersService {
    private readonly readingAnswerModel;
    constructor(readingAnswerModel: typeof ReadingAnswer);
    create(createDto: CreateReadingAnswerDto): Promise<ReadingAnswer>;
    findAll(): Promise<ReadingAnswer[]>;
    findByReadingId(readingId: string): Promise<ReadingAnswer[]>;
    findOne(id: string): Promise<ReadingAnswer>;
    update(id: string, updateDto: UpdateReadingAnswerDto): Promise<ReadingAnswer>;
    remove(id: string): Promise<void>;
}
