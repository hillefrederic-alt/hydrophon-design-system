import { ClaudeClient, createClaudeClient } from '../claude/index.js';
import { GeminiClient, createGeminiClient } from '../gemini/index.js';

export interface AIClientConfig {
  claudeApiKey?: string;
  geminiApiKey?: string;
}

/**
 * Unified AI Client
 * - Claude: Code, Text, UX Copy, Documentation
 * - Gemini: Images, Visual Prompts
 */
export class AIClient {
  private claude?: ClaudeClient;
  private gemini?: GeminiClient;

  constructor(config: AIClientConfig) {
    if (config.claudeApiKey) {
      this.claude = createClaudeClient({ apiKey: config.claudeApiKey });
    }
    if (config.geminiApiKey) {
      this.gemini = createGeminiClient({ apiKey: config.geminiApiKey });
    }

    if (!this.claude && !this.gemini) {
      throw new Error('At least one API key (Claude or Gemini) is required');
    }
  }

  // ============ TEXT (Claude) ============

  /**
   * Generate text content (uses Claude)
   */
  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    if (!this.claude) {
      throw new Error('Claude API key required for text generation');
    }
    return this.claude.generateText(prompt, systemPrompt);
  }

  /**
   * Stream text generation (uses Claude)
   */
  async *streamText(prompt: string, systemPrompt?: string) {
    if (!this.claude) {
      throw new Error('Claude API key required for streaming');
    }
    yield* this.claude.streamText(prompt, systemPrompt);
  }

  // ============ CODE (Claude) ============

  /**
   * Generate code with explanation (uses Claude)
   */
  async generateCode(description: string, language: string, context?: string) {
    if (!this.claude) {
      throw new Error('Claude API key required for code generation');
    }
    return this.claude.generateCode(description, language, context);
  }

  /**
   * Review and improve code (uses Claude)
   */
  async reviewCode(code: string, language: string) {
    if (!this.claude) {
      throw new Error('Claude API key required for code review');
    }
    return this.claude.reviewCode(code, language);
  }

  // ============ UX (Claude for copy, Gemini for visuals) ============

  /**
   * Generate UX copy/microcopy (uses Claude)
   */
  async generateUXCopy(
    element: string,
    context?: { tone?: string; brand?: string; language?: string }
  ) {
    if (!this.claude) {
      throw new Error('Claude API key required for UX copy');
    }
    return this.claude.generateUXCopy(element, context ?? {});
  }

  /**
   * Generate UX design prompt (uses Gemini)
   */
  async generateUXPrompt(
    description: string,
    context?: { style?: string; brand?: string; targetAudience?: string }
  ) {
    if (!this.gemini) {
      throw new Error('Gemini API key required for UX prompts');
    }
    return this.gemini.generateUXPrompt(description, context);
  }

  // ============ IMAGES (Gemini) ============

  /**
   * Generate image prompt for AI image generators (uses Gemini)
   */
  async generateImagePrompt(concept: string, style?: string) {
    if (!this.gemini) {
      throw new Error('Gemini API key required for image prompts');
    }
    return this.gemini.generateImagePrompt(concept, style);
  }

  /**
   * Generate images directly (uses Gemini)
   */
  async generateImage(prompt: string) {
    if (!this.gemini) {
      throw new Error('Gemini API key required for image generation');
    }
    return this.gemini.generateImage(prompt);
  }

  // ============ DOCUMENTATION (Claude) ============

  /**
   * Generate component documentation (uses Claude)
   */
  async generateComponentDocs(
    componentName: string,
    props: Record<string, string>,
    description?: string
  ) {
    if (!this.claude) {
      throw new Error('Claude API key required for documentation');
    }
    return this.claude.generateComponentDocs(componentName, props, description);
  }

  // ============ UTILITIES ============

  /**
   * Check which services are available
   */
  getAvailableServices() {
    return {
      claude: !!this.claude,
      gemini: !!this.gemini,
      text: !!this.claude,
      code: !!this.claude,
      images: !!this.gemini,
    };
  }
}

/**
 * Create a unified AI client
 */
export function createAIClient(config: AIClientConfig): AIClient {
  return new AIClient(config);
}

export default AIClient;
