import Anthropic from '@anthropic-ai/sdk';

export interface ClaudeClientConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class ClaudeClient {
  private client: Anthropic;
  private model: string;
  private maxTokens: number;

  constructor(config: ClaudeClientConfig) {
    if (!config.apiKey) {
      throw new Error('Claude API key is required');
    }

    this.client = new Anthropic({ apiKey: config.apiKey });
    this.model = config.model ?? 'claude-sonnet-4-20250514';
    this.maxTokens = config.maxTokens ?? 4096;
  }

  /**
   * Generate text from a single prompt
   */
  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: this.maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    return textBlock?.type === 'text' ? textBlock.text : '';
  }

  /**
   * Generate code with explanation
   */
  async generateCode(
    description: string,
    language: string,
    context?: string
  ): Promise<{ code: string; explanation: string }> {
    const systemPrompt = `Du bist ein erfahrener Softwareentwickler.
Erstelle sauberen, gut dokumentierten ${language} Code.
Antworte immer im folgenden Format:

## Code
\`\`\`${language}
[Dein Code hier]
\`\`\`

## Erklärung
[Kurze Erklärung des Codes]`;

    const prompt = context
      ? `Kontext: ${context}\n\nAufgabe: ${description}`
      : description;

    const response = await this.generateText(prompt, systemPrompt);

    // Parse response
    const codeMatch = response.match(/```[\w]*\n([\s\S]*?)```/);
    const explanationMatch = response.match(/## Erklärung\n([\s\S]*?)$/);

    return {
      code: codeMatch ? codeMatch[1].trim() : response,
      explanation: explanationMatch ? explanationMatch[1].trim() : '',
    };
  }

  /**
   * Review and improve existing code
   */
  async reviewCode(
    code: string,
    language: string
  ): Promise<{ issues: string[]; improved: string; suggestions: string[] }> {
    const systemPrompt = `Du bist ein Code-Reviewer. Analysiere den Code und gib Feedback.
Antworte im folgenden JSON-Format:
{
  "issues": ["Liste der gefundenen Probleme"],
  "improved": "Verbesserter Code",
  "suggestions": ["Weitere Verbesserungsvorschläge"]
}`;

    const response = await this.generateText(
      `Überprüfe diesen ${language} Code:\n\`\`\`${language}\n${code}\n\`\`\``,
      systemPrompt
    );

    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch {
      // Fallback if JSON parsing fails
    }

    return {
      issues: [],
      improved: code,
      suggestions: [response],
    };
  }

  /**
   * Multi-turn conversation
   */
  async chat(messages: ChatMessage[], systemPrompt?: string): Promise<string> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: this.maxTokens,
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    return textBlock?.type === 'text' ? textBlock.text : '';
  }

  /**
   * Stream text generation
   */
  async *streamText(
    prompt: string,
    systemPrompt?: string
  ): AsyncGenerator<string, void, unknown> {
    const stream = this.client.messages.stream({
      model: this.model,
      max_tokens: this.maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    });

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        yield event.delta.text;
      }
    }
  }

  /**
   * Generate UX copy and microcopy
   */
  async generateUXCopy(
    element: string,
    context: { tone?: string; brand?: string; language?: string }
  ): Promise<string[]> {
    const systemPrompt = `Du bist ein UX Writer. Erstelle klare, prägnante UI-Texte.
${context.tone ? `Tonalität: ${context.tone}` : ''}
${context.brand ? `Marke: ${context.brand}` : ''}
${context.language ? `Sprache: ${context.language}` : 'Sprache: Deutsch'}

Gib 3-5 Varianten zurück, eine pro Zeile.`;

    const response = await this.generateText(
      `Erstelle UI-Text für: ${element}`,
      systemPrompt
    );

    return response
      .split('\n')
      .map((line) => line.replace(/^\d+\.\s*/, '').trim())
      .filter((line) => line.length > 0);
  }

  /**
   * Generate component documentation
   */
  async generateComponentDocs(
    componentName: string,
    props: Record<string, string>,
    description?: string
  ): Promise<string> {
    const systemPrompt = `Du bist ein technischer Dokumentations-Experte.
Erstelle klare, vollständige Komponenten-Dokumentation im Markdown-Format.`;

    const propsText = Object.entries(props)
      .map(([name, type]) => `- ${name}: ${type}`)
      .join('\n');

    const prompt = `Dokumentiere diese UI-Komponente:

Name: ${componentName}
${description ? `Beschreibung: ${description}` : ''}

Props:
${propsText}

Erstelle eine vollständige Dokumentation mit:
- Beschreibung
- Props-Tabelle
- Verwendungsbeispiele
- Best Practices`;

    return this.generateText(prompt, systemPrompt);
  }
}

/**
 * Create a Claude client instance
 */
export function createClaudeClient(config: ClaudeClientConfig): ClaudeClient {
  return new ClaudeClient(config);
}

export default ClaudeClient;
