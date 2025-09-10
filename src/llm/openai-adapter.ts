import type { ChatRequest, ChatResponse, LlmAdapter, ProviderOptions } from './types';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

function getOpenAIClient(opts: ProviderOptions) {
  const baseURL = opts.baseURL || process.env.OPENAI_BASE_URL;
  return createOpenAI({ apiKey: opts.apiKey || process.env.OPENAI_API_KEY!, baseURL });
}

export const openAIAdapter: LlmAdapter = {
  async chat(req: ChatRequest, opts: ProviderOptions): Promise<ChatResponse> {
    const start = Date.now();
    const openai = getOpenAIClient(opts);
    const model = req.model || process.env.AI_DEFAULT_MODEL || 'gpt-4o-mini';

    const { text, usage } = await generateText({
      model: openai(model),
      messages: req.messages.map(m => ({ role: m.role, content: m.content })),
    });

    return {
      content: text,
      usage: {
        promptTokens: usage?.promptTokens,
        completionTokens: usage?.completionTokens,
        totalTokens: usage?.totalTokens,
        durationMs: Date.now() - start,
      },
      model,
      provider: 'openai',
    };
  },
};


