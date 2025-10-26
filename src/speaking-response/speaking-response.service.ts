import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SpeakingResponse } from "./entities/speaking-response.entity.js";
import { CreateSpeakingResponseDto } from "./dto/create-speaking-response.dto.js";
import { UpdateSpeakingResponseDto } from "./dto/update-speaking-response.dto.js";
import { User } from "../users/entities/user.entity.js";
import { SpeakingTests } from "../speaking-tests/entities/speaking-test.entity.js";
import { DeepgramService } from "../deepgram/deepgram.service.js";
import { OpenaiService } from "../openai/openai.service.js";
import { VocabularyLevelService } from "../vocabulary-level/vocabulary-level.service.js";
import { MyPurchasedTestsService } from "../my-purchased-tests/my-purchased-tests.service.js";

@Injectable()
export class SpeakingResponseService {
  private readonly logger = new Logger(SpeakingResponseService.name);

  constructor(
    @InjectModel(SpeakingResponse)
    private speakingResponseModel: typeof SpeakingResponse,
    private readonly deepgramService: DeepgramService,
    private readonly openaiService: OpenaiService,
    private readonly vocabularyLevelService: VocabularyLevelService,
    private readonly myPurchasedTestsService: MyPurchasedTestsService
  ) {}

  /**
   * Create a new speaking response
   * @param createDto Data to create the speaking response
   * @returns The created speaking response
   */
  async create(
    createDto: CreateSpeakingResponseDto
  ): Promise<SpeakingResponse> {
    this.logger.log("Creating new speaking response");

    // Create the response in the database
    const newResponse = await this.speakingResponseModel.create(createDto);
    this.logger.log(`Created new speaking response with ID: ${newResponse.id}`);

    // Perform immediate assessment if audio URL is provided
    if (newResponse.audio_url) {
      try {
        this.logger.log(
          `Starting immediate assessment for response ID: ${newResponse.id}`
        );
        // Perform assessment asynchronously to avoid blocking the response
        setTimeout(async () => {
          try {
            await this.assessSpeakingResponse(newResponse.id);
          } catch (error) {
            this.logger.error(
              `Async assessment error: ${error.message}`,
              error.stack
            );
          }
        }, 0);
      } catch (error) {
        this.logger.error(
          `Error setting up assessment: ${error.message}`,
          error.stack
        );
      }
    }

    return newResponse;
  }

  async findAll(): Promise<SpeakingResponse[]> {
    return this.speakingResponseModel.findAll({
      include: [User, SpeakingTests],
    });
  }

  async findOne(id: string): Promise<SpeakingResponse> {
    const response = await this.speakingResponseModel.findByPk(id, {
      include: [User, SpeakingTests],
    });
    if (!response) throw new NotFoundException("Speaking response not found");
    return response;
  }

  async findByUserId(userId: string): Promise<SpeakingResponse[]> {
    return this.speakingResponseModel.findAll({
      where: { user_id: userId },
      include: [User, SpeakingTests],
    });
  }

  async findByTestId(testId: string): Promise<SpeakingResponse[]> {
    return this.speakingResponseModel.findAll({
      where: { test_id: testId },
      include: [User, SpeakingTests],
    });
  }

  async findByUserAndTest(
    userId: string,
    testId: string
  ): Promise<SpeakingResponse[]> {
    return this.speakingResponseModel.findAll({
      where: {
        user_id: userId,
        test_id: testId,
      },
      include: [User, SpeakingTests],
    });
  }

  async update(
    id: string,
    updateDto: UpdateSpeakingResponseDto
  ): Promise<SpeakingResponse> {
    const response = await this.findOne(id);
    await response.update(updateDto);
    return response;
  }

  async remove(id: string): Promise<void> {
    const response = await this.findOne(id);
    await response.destroy();
  }

  /**
   * Calculate Words Per Minute (WPM) from text
   * @param text The transcribed text
   * @returns WPM value
   */
  private calculateWPM(text: string): number {
    // Split the text by spaces to get the number of words
    const words = text.trim().split(/\s+/).length;
    
    // Convert time from seconds to minutes
    const timeInMinutes = 480 / 60;
    
    // Calculate words per minute
    const wpm = words / timeInMinutes;
    
    return wpm;
  }

  /**
   * Assess a speaking response using multiple services
   * @param responseId ID of the speaking response to assess
   * @returns Assessment results including transcription, AI evaluation, and vocabulary level
   */
  async assessSpeakingResponse(responseId: string): Promise<any> {
    try {
      this.logger.log(
        `Starting assessment for speaking response: ${responseId}`
      );

      // Get the speaking response
      const response = await this.findOne(responseId);
      if (!response) {
        throw new NotFoundException(
          `Speaking response with ID ${responseId} not found`
        );
      }

      // Check if this response has already been assessed
      if (response.response && response.response["assessment"]) {
        this.logger.log(
          `Response ${responseId} has already been assessed. Returning existing assessment.`
        );
        return response.response["assessment"];
      }

      // Step 1: Transcribe audio using Deepgram
      let transcript = "";
      if (response.transcript) {
        // If transcript already exists, use it
        transcript = response.transcript;
        this.logger.log(`Using existing transcript for response ${responseId}`);
      } else {
        // Otherwise, generate a new transcript
        this.logger.log(`Transcribing audio from URL: ${response.audio_url}`);
        const transcriptionResult =
          await this.deepgramService.transcribeSpeakingResponse(response.audio_url);
        transcript =
          transcriptionResult.results.channels[0].alternatives[0].transcript ||
          "";

        // Save transcript and speaking metrics back to the response
        response.transcript = transcript;
        
        // Store the detailed transcription result including speaking metrics
        response.response = {
          ...(response.response || {}),
          transcription_details: transcriptionResult.speaking_metrics,
        };
        
        await response.save();
        this.logger.log(`Transcript and speaking metrics saved for response ${responseId}`);
      }

      // Check if the user said nothing or very little
      if (!transcript || transcript.trim().length < 5) {
        const emptyResponseMessage = {
          id: responseId,
          transcript: "",
          error: "empty_response",
          message:
            "No speech detected in the audio. Please record your response again.",
          timestamp: new Date(),
        };

        // Save the error message in the response
        response.response = {
          ...(response.response || {}),
          assessment: emptyResponseMessage,
        };

        await response.save();
        this.logger.log(`Empty response detected for ${responseId}`);

        return emptyResponseMessage;
      }

      // Step 2: Assess speaking using OpenAI
      this.logger.log(
        `Analyzing speaking with OpenAI for response ${responseId}`
      );
      const aiAssessment = await this.openaiService.assessSpeaking(transcript);

      // Step 3: Analyze vocabulary level
      this.logger.log(`Analyzing vocabulary level for response ${responseId}`);
      const vocabLevelResult =
        await this.vocabularyLevelService.checkLevel(transcript);

      // Step 4: Calculate Words Per Minute (WPM)
      this.logger.log(`Calculating WPM for response ${responseId}`);
      const wpm = this.calculateWPM(transcript);

      // Step 5: Combine the results
      const assessmentResult = {
        id: responseId,
        transcript,
        aiAssessment,
        vocabularyLevel: vocabLevelResult,
        wpm,
        timestamp: new Date(),
      };

      // Step 6: Update the response with assessment data
      response.response = {
        ...(response.response || {}),
        assessment: assessmentResult,
      };

      await response.save();
      this.logger.log(
        `Assessment completed and saved for response ${responseId}`
      );

      // Update the user's purchased test status to completed
      try {
        // Find purchased tests for this user and test
        const purchasedTests = await this.myPurchasedTestsService.findByUserId(
          response.user_id
        );
        const matchingTest = purchasedTests.find(
          (test) => test.test_id === response.test_id
        );

        if (matchingTest) {
          // Update the test status to completed
          await this.myPurchasedTestsService.update(matchingTest.id, {
            status: "completed",
          });
          this.logger.log(
            `Updated purchased test ${matchingTest.id} status to completed`
          );
        } else {
          this.logger.warn(
            `No matching purchased test found for user ${response.user_id} and test ${response.test_id}`
          );
        }
      } catch (error) {
        // Log the error but don't fail the assessment
        this.logger.error(
          `Error updating purchased test status: ${error.message}`,
          error.stack
        );
      }

      return assessmentResult;
    } catch (error) {
      this.logger.error(
        `Error assessing speaking response ${responseId}: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  /**
   * Batch assess multiple speaking responses for a user and test
   * @param userId User ID
   * @param testId Test ID (optional)
   * @returns Array of assessment results
   */
  async batchAssessSpeakingResponses(
    userId: string,
    testId?: string
  ): Promise<any[]> {
    try {
      this.logger.log(
        `Starting batch assessment for user ${userId}${testId ? ` and test ${testId}` : ""}`
      );

      // Get responses for the user (and test if specified)
      const responses = testId
        ? await this.findByUserAndTest(userId, testId)
        : await this.findByUserId(userId);

      if (!responses.length) {
        this.logger.warn(
          `No responses found for user ${userId}${testId ? ` and test ${testId}` : ""}`
        );
        return [];
      }

      // Process each response
      const assessmentResults = [];
      for (const response of responses) {
        try {
          const result = await this.assessSpeakingResponse(response.id);
          assessmentResults.push(result);
        } catch (error) {
          this.logger.error(
            `Error assessing response ${response.id}: ${error.message}`
          );
          // Continue with other responses even if one fails
        }
      }

      // After all assessments are done, update the purchased test status
      if (testId && assessmentResults.length > 0) {
        try {
          // Find purchased tests for this user and test
          const purchasedTests =
            await this.myPurchasedTestsService.findByUserId(userId);
          const matchingTest = purchasedTests.find(
            (test) => test.test_id === testId
          );

          if (matchingTest) {
            // Update the test status to completed
            await this.myPurchasedTestsService.update(matchingTest.id, {
              status: "completed",
            });
            this.logger.log(
              `Updated purchased test ${matchingTest.id} status to completed in batch assessment`
            );
          } else {
            this.logger.warn(
              `No matching purchased test found for user ${userId} and test ${testId} in batch assessment`
            );
          }
        } catch (error) {
          // Log the error but don't fail the assessment
          this.logger.error(
            `Error updating purchased test status in batch assessment: ${error.message}`,
            error.stack
          );
        }
      }

      this.logger.log(
        `Batch assessment completed for ${assessmentResults.length} of ${responses.length} responses`
      );
      return assessmentResults;
    } catch (error) {
      this.logger.error(
        `Error in batch assessment: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }
}
