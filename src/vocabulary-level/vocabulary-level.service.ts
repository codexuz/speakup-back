import { Injectable } from '@nestjs/common';
import grade from 'vocabulary-level-grader';

@Injectable()
export class VocabularyLevelService {
    checkLevel(text: string) {
    return grade(text);
  }
}
