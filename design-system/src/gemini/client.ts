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

export interface ImageGenerationConfig {
  numberOfImages?: number;
  aspectRatio?: '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
  negativePrompt?: string;
}

export interface GeneratedImage {
  base64: string;
  mimeType: string;
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

  /**
   * Generate images using Imagen 3
   */
  async generateImage(
    prompt: string,
    config?: ImageGenerationConfig
  ): Promise<GeneratedImage[]> {
    const imageModel = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
    });

    const result = await imageModel.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: `Generate an image: ${prompt}` }]
      }],
      generationConfig: {
        responseModalities: ['image', 'text'],
      } as GenerationConfig,
    });

    const response = result.response;
    const images: GeneratedImage[] = [];

    for (const candidate of response.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData) {
          images.push({
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType,
          });
        }
      }
    }

    return images;
  }

  /**
   * Generate UX design prompts for a given component or page
   */
  async generateUXPrompt(
    description: string,
    context?: { style?: string; brand?: string; targetAudience?: string }
  ): Promise<string> {
    const systemPrompt = `Du bist ein UX Design Experte. Erstelle detaillierte Prompts für UI/UX Design.
${context?.style ? `Stil: ${context.style}` : ''}
${context?.brand ? `Marke: ${context.brand}` : ''}
${context?.targetAudience ? `Zielgruppe: ${context.targetAudience}` : ''}

Erstelle einen detaillierten Prompt für folgendes Design-Element:`;

    const result = await this.model.generateContent(`${systemPrompt}\n\n${description}`);
    return result.response.text();
  }

  /**
   * Generate image prompt optimized for AI image generators
   */
  async generateImagePrompt(
    concept: string,
    style?: string
  ): Promise<string> {
    const systemPrompt = `Du bist ein Experte für AI-Bildgenerierung. Erstelle optimierte Prompts für Bildgeneratoren wie Midjourney, DALL-E oder Stable Diffusion.

Der Prompt sollte enthalten:
- Detaillierte visuelle Beschreibung
- Stil und Ästhetik
- Beleuchtung und Atmosphäre
- Technische Parameter (z.B. "8k", "photorealistic", etc.)

${style ? `Gewünschter Stil: ${style}` : ''}

Erstelle einen Bildgenerierungs-Prompt für:`;

    const result = await this.model.generateContent(`${systemPrompt}\n\n${concept}`);
    return result.response.text();
  }
}

/**
 * Create a Gemini client instance
 */
export function createGeminiClient(config: GeminiClientConfig): GeminiClient {
  return new GeminiClient(config);
}

export default GeminiClient;
