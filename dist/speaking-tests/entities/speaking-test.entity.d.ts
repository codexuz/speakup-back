import { Model } from 'sequelize-typescript';
export declare class SpeakingTests extends Model<SpeakingTests> {
    id: string;
    title: string;
    description: string;
    created_at: Date;
    isActive: boolean;
}
