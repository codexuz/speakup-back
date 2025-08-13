import { Model } from "sequelize-typescript";
export declare class ReadingAnswer extends Model<ReadingAnswer> {
    id: string;
    reading_answers: string[];
    reading_id: string;
    created_at: Date;
}
