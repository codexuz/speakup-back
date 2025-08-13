import { ReadingQuestion } from './entities/reading-question.entity.js';
import { CreateReadingQuestionDto } from './dto/create-reading-question.dto.js';
import { UpdateReadingQuestionDto } from './dto/update-reading-question.dto.js';
export declare class ReadingQuestionsService {
    private readonly readingQuestionModel;
    constructor(readingQuestionModel: typeof ReadingQuestion);
    create(createDto: CreateReadingQuestionDto): Promise<ReadingQuestion>;
    findAll(): Promise<ReadingQuestion[]>;
    findByReadingTextId(readingTextId: string): Promise<ReadingQuestion[]>;
    findByPart(part: string): Promise<ReadingQuestion[]>;
    findOne(id: string): Promise<ReadingQuestion>;
    update(id: string, updateDto: UpdateReadingQuestionDto): Promise<ReadingQuestion>;
    remove(id: string): Promise<void>;
}
