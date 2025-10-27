import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { ConfigService } from "@nestjs/config";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  private responseFormat = z.object({
    fluency: z.number(),
    cefr_score: z.number(),
    cefr_level: z.string(),
    pronunciation: z.number(),
    grammar: z.number(),
    vocabulary: z.number(),
    fluencyFeedback: z.string(),
    grammarFeedback: z.string(),
    pronunciationFeedback: z.string(),
    vocabularyFeedback: z.string(),
    feedback: z.string(),
  });

  private cefrLevels = [
    { level: "A1", from: 0, to: 9 },
    { level: "A2", from: 9, to: 37 },
    { level: "B1", from: 38, to: 50 },
    { level: "B2", from: 51, to: 64 },
    { level: "C1", from: 65, to: 75 },
  ];


  constructor(private readonly configService: ConfigService) {
    const api_key = this.configService.get<string>("openAiKey");
    this.openai = new OpenAI({
      apiKey: api_key,
    });
  }

  /**
   * Convert score from 100 scale to 75 scale
   * @param scoreOutOf100 Score out of 100
   * @returns Score out of 75
   */
  private convertScoreTo75(scoreOutOf100: number): number {
    return Math.round((scoreOutOf100 / 75) * 100);
  }

  /**
   * Get CEFR level based on score out of 75
   * @param scoreOutOf75 Score out of 75
   * @returns CEFR level object
   */
  private getCefrLevel(scoreOutOf75: number): { level: string; from: number; to: number } {
    for (const cefrLevel of this.cefrLevels) {
      if (scoreOutOf75 >= cefrLevel.from && scoreOutOf75 <= cefrLevel.to) {
        return cefrLevel;
      }
    }
    // Default to A1 if score is below range
    return this.cefrLevels[0];
  }


  async assessSpeaking(userResponse: string) {
    const result = await this.openai.responses.parse({
      model: "ft:gpt-4o-mini-2024-07-18:examonline:cefr-assessment:Bd7Shpgm",
      input: [
        {
          role: "system",
          content:
            `You are a speaking examiner scoring a response and giving feedback, including a randomized CEFR score within the national mapping limits for Uzbekistan and the corresponding CEFR level score-range: 0-75.
            CEFR A1: 0-9 
            CEFR A2: 9-37 
            CEFR B1: 38-50 
            CEFR B2: 51-64 
            CEFR C1: 65-75 
            `,
        },
        {
          role: "user",
          content: `${userResponse}`,
        },
      ],
      text: {
        format: zodTextFormat(this.responseFormat, "response"),
      },
    });

    const parsedResult = result.output_parsed;
    
    // Convert the CEFR score from 100 to 75 scale
    const scoreOutOf75 = this.convertScoreTo75(parsedResult.cefr_score);
    
    // Get the correct CEFR level based on the converted score
    const cefrLevelInfo = this.getCefrLevel(scoreOutOf75);

    // Return the result with converted score and remapped CEFR level
    return {
      ...parsedResult,
      cefr_score_original: parsedResult.cefr_score, // Original score out of 100
      cefr_score: scoreOutOf75, // Converted score out of 75
      cefr_level: cefrLevelInfo.level, // Remapped CEFR level
      cefr_level_range: {
        from: cefrLevelInfo.from,
        to: cefrLevelInfo.to,
      },
    };
  }
  

}

