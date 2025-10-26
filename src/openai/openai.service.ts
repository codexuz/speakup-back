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


  constructor(private readonly configService: ConfigService) {
    const api_key = this.configService.get<string>("openAiKey");
    this.openai = new OpenAI({
      apiKey: api_key,
    });
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
          content: `Response: ${userResponse}`,
        },
      ],
      text: {
        format: zodTextFormat(this.responseFormat, "response"),
      },
    });

    return result.output_parsed;
  }
  

}

