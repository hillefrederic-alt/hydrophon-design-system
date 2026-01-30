import { GoogleGenerativeAI, GenerativeModel, GenerationConfig } from '@google/generative-ai';

export interface GeminiClientConfig {
  apiKey: string;
  model?: string;
  generationConfig?: GenerationConfig;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export class GeminiClient {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private defaultConfig: GenerationConfig;

  constructor(config: GeminiClientConfig) {
    if (!config.apiKey) {
      throw new Error('Gemini API key is required');
    }

    this.genAI = new GoogleGenerativeAI(config.apiKey);
    this.defaultConfig = config.generationConfig ?? {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 2048,
    };

    this.model = this.genAI.getGenerativeModel({
      model: config.model ?? 'gemini-2.0-flash',
      generationConfig: this.defaultConfig,
    });
  }

  /**
   * Generate text from a single prompt
   */
  async generateText(prompt: string, config?: Partial<GenerationConfig>): Promise<string> {
    const model = config
      ? this.genAI.getGenerativeModel({
          model: this.model.model,
          generationConfig: { ...this.defaultConfig, ...config },
        })
      : this.model;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  }

  /**
   * Start a multi-turn chat session
   */
  startChat(history?: ChatMessage[]) {
    const formattedHistory = history?.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    return this.model.startChat({
      history: formattedHistory,
    });
  }

  /**
   * Send a message in a chat session and get a response
   */
  async chat(
    chatSession: ReturnType<GenerativeModel['startChat']>,
    message: string
  ): Promise<string> {
    const result = await chatSession.sendMessage(message);
    return result.response.text();
  }

  /**
   * Stream text generation for real-time responses
   */
  async *streamText(
    prompt: string,
    config?: Partial<GenerationConfig>
  ): AsyncGenerator<string, void, unknown> {
    const model = config
      ? this.genAI.getGenerativeModel({
          model: this.model.model,
          generationConfig: { ...this.defaultConfig, ...config },
        })
      : this.model;

    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        yield text;
      }
    }
  }

  /**
   * Count tokens in a text string
   */
  async countTokens(text: string): Promise<number> {
    const result = await this.model.countTokens(text);
    return result.totalTokens;
  }
}

/**
 * Create a Gemini client instance
 */
export function createGeminiClient(config: GeminiClientConfig): GeminiClient {
  return new GeminiClient(config);
}

export default GeminiClient;
