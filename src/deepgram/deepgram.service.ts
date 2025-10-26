import { Injectable } from "@nestjs/common";
import { createClient } from "@deepgram/sdk";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DeepgramService {
  private readonly deepgram: any;
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>("DEEPGRAM_API_KEY");
    this.deepgram = createClient(apiKey);
  }

  async transcribeRemoteAudio(audioUrl: string): Promise<any> {
    const { result, error } =
      await this.deepgram.listen.prerecorded.transcribeUrl(
        {
          url: audioUrl,
        },
        {
          smart_format: true,
          filler_words: true,
          model: "nova-3",
        }
      );
    if (error) throw error;
    return result;
  }

  async transcribeLocalAudio(audioFile: string): Promise<any> {
    const { result, error } =
      await this.deepgram.listen.prerecorded.transcribeFile(audioFile, {
        smart_format: true,
        filler_words: true,
        model: "nova-3",
      });
    if (error) throw error;
    return result;
  }

  async transcribeBuffer(audioBuffer: Buffer, mimetype: string = 'audio/mpeg'): Promise<any> {
    try {
      const { result, error } = await this.deepgram.listen.prerecorded.transcribeFile(
        audioBuffer,
        {
          smart_format: true,
          filler_words: true,
          model: "nova-3",
          mimetype: mimetype,
        }
      );
      if (error) throw error;
      return result;
    } catch (error) {
      throw new Error(`Failed to transcribe audio buffer: ${error.message}`);
    }
  }

  /**
   * Transcribe audio specifically for speaking response assessment
   * Includes additional features like diarization, punctuation, and speaking metrics
   * @param audioUrl URL of the audio file to transcribe
   * @returns Detailed transcription result with speaking assessment features
   */
  async transcribeSpeakingResponse(audioUrl: string): Promise<any> {
    try {
      const { result, error } =
        await this.deepgram.listen.prerecorded.transcribeUrl(
          {
            url: audioUrl,
          },
          {
            smart_format: true,
            filler_words: true,
            model: "nova-3",
            punctuate: true,
            paragraphs: true,
            utterances: true,
            diarize: false, // Set to true if multiple speakers
            language: "en",
            detect_language: false,
            profanity_filter: false,
            redact: false,
            search: [],
            keywords: [],
            numerals: true,
            measurements: true,
            dictation: false,
            utt_split: 0.8, // Split utterances after 0.8 seconds of silence
          }
        );
      
      if (error) throw error;
      
      // Extract additional metrics for speaking assessment
      const channel = result.results?.channels?.[0];
      const alternatives = channel?.alternatives?.[0];
      
      const enhancedResult = {
        ...result,
        speaking_metrics: {
          total_duration: result.metadata?.duration || 0,
          word_count: alternatives?.words?.length || 0,
          confidence_score: alternatives?.confidence || 0,
          speaking_rate: this.calculateSpeakingRate(alternatives?.words, result.metadata?.duration),
          pause_analysis: this.analyzePauses(channel?.alternatives?.[0]?.words),
          filler_word_count: this.countFillerWords(alternatives?.transcript || ''),
        }
      };
      
      return enhancedResult;
    } catch (error) {
      throw new Error(`Failed to transcribe speaking response: ${error.message}`);
    }
  }

  /**
   * Calculate speaking rate (words per minute)
   * @param words Array of word objects from Deepgram
   * @param duration Total duration in seconds
   * @returns Speaking rate in words per minute
   */
  private calculateSpeakingRate(words: any[], duration: number): number {
    if (!words || !duration || duration === 0) return 0;
    
    const wordCount = words.length;
    const durationInMinutes = duration / 60;
    return Math.round(wordCount / durationInMinutes);
  }

  /**
   * Analyze pauses in speech
   * @param words Array of word objects with timestamps
   * @returns Pause analysis including count and average duration
   */
  private analyzePauses(words: any[]): any {
    if (!words || words.length < 2) {
      return {
        pause_count: 0,
        average_pause_duration: 0,
        longest_pause: 0,
        total_pause_time: 0
      };
    }

    const pauses = [];
    for (let i = 1; i < words.length; i++) {
      const previousWord = words[i - 1];
      const currentWord = words[i];
      
      if (previousWord.end && currentWord.start) {
        const pauseDuration = currentWord.start - previousWord.end;
        if (pauseDuration > 0.3) { // Only count pauses longer than 300ms
          pauses.push(pauseDuration);
        }
      }
    }

    const totalPauseTime = pauses.reduce((sum, pause) => sum + pause, 0);
    const averagePause = pauses.length > 0 ? totalPauseTime / pauses.length : 0;
    const longestPause = pauses.length > 0 ? Math.max(...pauses) : 0;

    return {
      pause_count: pauses.length,
      average_pause_duration: Math.round(averagePause * 1000) / 1000, // Round to 3 decimal places
      longest_pause: Math.round(longestPause * 1000) / 1000,
      total_pause_time: Math.round(totalPauseTime * 1000) / 1000
    };
  }

  /**
   * Count filler words in transcript
   * @param transcript The transcribed text
   * @returns Number of filler words found
   */
  private countFillerWords(transcript: string): number {
    const fillerWords = [
      'um', 'uh', 'ah', 'er', 'eh', 'like', 'you know', 'so', 'well',
      'actually', 'basically', 'literally', 'totally', 'really', 'very',
      'kind of', 'sort of', 'i mean', 'you see', 'right'
    ];
    
    const words = transcript.toLowerCase().split(/\s+/);
    let fillerCount = 0;
    
    // Check for single-word fillers
    fillerCount += words.filter(word => 
      fillerWords.includes(word.replace(/[^\w]/g, ''))
    ).length;
    
    // Check for multi-word fillers
    const text = transcript.toLowerCase();
    const multiWordFillers = ['you know', 'i mean', 'kind of', 'sort of', 'you see'];
    multiWordFillers.forEach(filler => {
      const matches = text.match(new RegExp(filler, 'g'));
      if (matches) {
        fillerCount += matches.length;
      }
    });
    
    return fillerCount;
  }
}
