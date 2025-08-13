import { Test, TestingModule } from '@nestjs/testing';
import { ReadingQuestionsController } from './reading-questions.controller';
import { ReadingQuestionsService } from './reading-questions.service';

describe('ReadingQuestionsController', () => {
  let controller: ReadingQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReadingQuestionsController],
      providers: [ReadingQuestionsService],
    }).compile();

    controller = module.get<ReadingQuestionsController>(ReadingQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
