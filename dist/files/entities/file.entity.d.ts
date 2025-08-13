import { Model } from "sequelize-typescript";
export declare class File extends Model<File> {
    id: string;
    s3Key: string;
    bucket: string;
    mime: string;
    comment: string;
    created_at: Date;
}
