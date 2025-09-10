import type { ChatRequest, ChatResponse, LlmAdapter, ProviderOptions } from './types';
import { openAIAdapter } from './openai-adapter';
import { mockAdapter } from './mock-adapter';

function pickAdapter(opts: ProviderOptions): LlmAdapter {
  const demo = process.env.AI_DEMO_MODE === 'true';
  const provider = opts.provider || process.env.AI_DEFAULT_PROVIDER || 'openai';

  if (demo && !opts.apiKey) return mockAdapter;

  switch (provider) {
    case 'openai':
    case 'proxy':
      return openAIAdapter;
    case 'mock':
      return mockAdapter;
    default:
      return openAIAdapter;
  }
}

export async function chat(req: ChatRequest, opts: ProviderOptions): Promise<ChatResponse> {
  const adapter = pickAdapter(opts);
  return adapter.chat(req, opts);
}

export * from './types';


