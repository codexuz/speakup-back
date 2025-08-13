import { Model } from "sequelize-typescript";
export declare class ReadingPassages extends Model<ReadingPassages> {
    id: string;
    part: string;
    reading_text: string;
    reading_id: string;
    created_at: Date;
}
