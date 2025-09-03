import { Module } from '@nestjs/common';
import { VocabularyLevelService } from './vocabulary-level.service.js';

@Module({
  providers: [VocabularyLevelService],
  exports: [VocabularyLevelService]
})
export class VocabularyLevelModule {}
