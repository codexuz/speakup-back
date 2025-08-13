import { Model } from "sequelize-typescript";
export declare class Reading extends Model<Reading> {
    id: string;
    title: string;
    test_id: string;
    isActive: boolean;
    created_at: Date;
}
