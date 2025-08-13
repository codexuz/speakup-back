import { ReadingQuestionsService } from './reading-questions.service.js';
import { CreateReadingQuestionDto } from './dto/create-reading-question.dto.js';
import { UpdateReadingQuestionDto } from './dto/update-reading-question.dto.js';
export declare class ReadingQuestionsController {
    private readonly readingQuestionsService;
    constructor(readingQuestionsService: ReadingQuestionsService);
    create(createDto: CreateReadingQuestionDto): Promise<import("./entities/reading-question.entity.js").ReadingQuestion>;
    findAll(): Promise<import("./entities/reading-question.entity.js").ReadingQuestion[]>;
    findByReadingTextId(textId: string): Promise<import("./entities/reading-question.entity.js").ReadingQuestion[]>;
    findByPart(part: string): Promise<import("./entities/reading-question.entity.js").ReadingQuestion[]>;
    findOne(id: string): Promise<import("./entities/reading-question.entity.js").ReadingQuestion>;
    update(id: string, updateDto: UpdateReadingQuestionDto): Promise<import("./entities/reading-question.entity.js").ReadingQuestion>;
    remove(id: string): Promise<void>;
}
