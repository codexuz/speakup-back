import { Model } from "sequelize-typescript";
export declare class ReadingQuestion extends Model<ReadingQuestion> {
    id: string;
    content: object;
    part: string;
    reading_text_id: string;
    created_at: Date;
}
