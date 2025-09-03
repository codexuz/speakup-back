import { Test, TestingModule } from '@nestjs/testing';
import { ReadingQuestionsService } from './reading-questions.service';

describe('ReadingQuestionsService', () => {
  let service: ReadingQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadingQuestionsService],
    }).compile();

    service = module.get<ReadingQuestionsService>(ReadingQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
