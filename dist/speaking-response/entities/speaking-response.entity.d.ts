import { Model } from "sequelize-typescript";
export declare class SpeakingResponse extends Model<SpeakingResponse> {
    id: string;
    transcript: string;
    audio_url: string;
    response: object;
    user_id: string;
    test_id: string;
    created_at: Date;
}
