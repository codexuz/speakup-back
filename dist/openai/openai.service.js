var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { ConfigService } from "@nestjs/config";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
let OpenaiService = class OpenaiService {
    constructor(configService) {
        this.configService = configService;
        this.responseFormat = z.object({
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
        const api_key = this.configService.get("openAiKey");
        this.openai = new OpenAI({
            apiKey: api_key,
        });
    }
    async assessSpeaking(userResponse) {
        const result = await this.openai.responses.parse({
            model: "ft:gpt-4o-mini-2024-07-18:examonline:cefr-assessment:Bd7Shpgm",
            input: [
                {
                    role: "system",
                    content: "You are an IELTS examiner scoring a response and giving feedback, including a randomized CEFR score within the national mapping limits for Uzbekistan and the corresponding CEFR level.",
                },
                {
                    role: "user",
                    content: userResponse,
                },
            ],
            text: {
                format: zodTextFormat(this.responseFormat, "response"),
            },
        });
        return result.output_parsed;
    }
};
OpenaiService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], OpenaiService);
export { OpenaiService };
//# sourceMappingURL=openai.service.js.map