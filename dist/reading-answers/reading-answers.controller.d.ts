import { ReadingAnswersService } from './reading-answers.service.js';
import { CreateReadingAnswerDto } from './dto/create-reading-answer.dto.js';
import { UpdateReadingAnswerDto } from './dto/update-reading-answer.dto.js';
export declare class ReadingAnswersController {
    private readonly readingAnswersService;
    constructor(readingAnswersService: ReadingAnswersService);
    create(createReadingAnswerDto: CreateReadingAnswerDto): Promise<import("./entities/reading-answer.entity.js").ReadingAnswer>;
    findAll(): Promise<import("./entities/reading-answer.entity.js").ReadingAnswer[]>;
    findByReadingId(readingId: string): Promise<import("./entities/reading-answer.entity.js").ReadingAnswer[]>;
    findOne(id: string): Promise<import("./entities/reading-answer.entity.js").ReadingAnswer>;
    update(id: string, updateDto: UpdateReadingAnswerDto): Promise<import("./entities/reading-answer.entity.js").ReadingAnswer>;
    remove(id: string): Promise<void>;
}
