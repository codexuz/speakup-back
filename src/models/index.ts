import { User } from "../users/entities/user.entity.js";
import { Otp } from "../otp/entities/otp.entity.js";
import { SpeakingTests } from "../speaking-tests/entities/speaking-test.entity.js";
import { SpeakingPart } from "../speaking-parts/entities/speaking-part.entity.js";
import { SpeakingResponse } from "../speaking-response/entities/speaking-response.entity.js";
import { File } from "../files/entities/file.entity.js";
import { Reading } from "../reading/entities/reading.entity.js";
import { ReadingAnswer } from "../reading-answers/entities/reading-answer.entity.js";
import { ReadingPassages } from "../reading-passages/entities/reading-passage.entity.js";
import { ReadingQuestion } from "../reading-questions/entities/reading-question.entity.js";
import { UserResponse } from "../user-response/entities/user-response.entity.js";


export const Models = [
    User,
    Otp,
    SpeakingTests,
    SpeakingPart,
    SpeakingResponse,
    File,
    Reading,
    ReadingAnswer,
    ReadingPassages,
    ReadingQuestion,
    UserResponse
] 

export function associateModels() {
    // Define associations here
   SpeakingTests.hasMany(SpeakingPart, { foreignKey: 'test_id' });
   SpeakingPart.belongsTo(SpeakingTests, { foreignKey: 'test_id' });
   
   SpeakingTests.hasMany(SpeakingResponse, { foreignKey: 'test_id' });
   SpeakingResponse.belongsTo(SpeakingTests, { foreignKey: 'test_id' });

   User.hasMany(SpeakingResponse, { foreignKey: 'user_id' });
   SpeakingResponse.belongsTo(User, { foreignKey: 'user_id' });

   // Reading Answer associations
   Reading.hasMany(ReadingAnswer, { foreignKey: 'reading_id' });
   ReadingAnswer.belongsTo(Reading, { foreignKey: 'reading_id' });
   
   // Reading Passages associations
   Reading.hasMany(ReadingPassages, { foreignKey: 'reading_id' });
   ReadingPassages.belongsTo(Reading, { foreignKey: 'reading_id' });
   
   // Reading Questions associations
   ReadingPassages.hasMany(ReadingQuestion, { foreignKey: 'reading_text_id' });
   ReadingQuestion.belongsTo(ReadingPassages, { foreignKey: 'reading_text_id' });
   
   // User Response associations
   Reading.hasMany(UserResponse, { foreignKey: 'reading_id' });
   UserResponse.belongsTo(Reading, { foreignKey: 'reading_id' });
   User.hasMany(UserResponse, { foreignKey: 'user_id' });
   UserResponse.belongsTo(User, { foreignKey: 'user_id' });
}
