import { Model } from "sequelize-typescript";
export declare class UserResponse extends Model<UserResponse> {
    id: string;
    user_answers: string[];
    reading_id: string;
    user_id: string;
    created_at: Date;
}
