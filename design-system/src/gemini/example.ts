/**
 * Example usage of the Gemini client
 *
 * Run with: npx tsx src/gemini/example.ts
 *
 * Make sure to set GEMINI_API_KEY environment variable first:
 * export GEMINI_API_KEY="your-api-key-here"
 */

import { createGeminiClient } from './client.js';

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY environment variable is not set');
    console.log('Get your API key from: https://aistudio.google.com/apikey');
    process.exit(1);
  }

  const client = createGeminiClient({ apiKey });

  // Example 1: Simple text generation
  console.log('--- Simple Text Generation ---');
  const response = await client.generateText('Explain what a design system is in 2 sentences.');
  console.log(response);
  console.log();

  // Example 2: Text generation with custom config
  console.log('--- Creative Text Generation ---');
  const creativeResponse = await client.generateText(
    'Write a tagline for a modern design system called Hydrophon.',
    { temperature: 1.0, maxOutputTokens: 100 }
  );
  console.log(creativeResponse);
  console.log();

  // Example 3: Multi-turn chat
  console.log('--- Multi-turn Chat ---');
  const chat = client.startChat();

  const msg1 = await client.chat(chat, 'Hi! I\'m building a design system. What are the essential components I should include?');
  console.log('Assistant:', msg1);
  console.log();

  const msg2 = await client.chat(chat, 'Can you focus on typography specifically?');
  console.log('Assistant:', msg2);
  console.log();

  // Example 4: Streaming response
  console.log('--- Streaming Response ---');
  process.stdout.write('Assistant: ');
  for await (const chunk of client.streamText('List 5 color palette tips for accessibility.')) {
    process.stdout.write(chunk);
  }
  console.log('\n');

  // Example 5: Token counting
  console.log('--- Token Counting ---');
  const text = 'This is a sample text to count tokens for.';
  const tokenCount = await client.countTokens(text);
  console.log(`Text: "${text}"`);
  console.log(`Token count: ${tokenCount}`);
}

main().catch(console.error);
