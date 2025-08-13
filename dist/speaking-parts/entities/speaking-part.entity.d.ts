import { Model } from "sequelize-typescript";
export declare class SpeakingPart extends Model<SpeakingPart> {
    id: string;
    question: string;
    part: "1.1" | "1.2" | "2" | "3";
    image_url: string;
    audio_url: string;
    sample_answer: string;
    test_id: string;
    created_at: Date;
}
