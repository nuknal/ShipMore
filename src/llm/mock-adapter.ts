import type { ChatRequest, ChatResponse, LlmAdapter, ProviderOptions } from './types';

export const mockAdapter: LlmAdapter = {
  async chat(req: ChatRequest, _opts: ProviderOptions): Promise<ChatResponse> {
    const lastUser = [...req.messages].reverse().find(m => m.role === 'user');
    const content = `Mock reply: ${lastUser?.content ?? 'Hello from mock adapter.'}`;
    return {
      content,
      usage: { totalTokens: content.length, promptTokens: 0, completionTokens: content.length },
      model: req.model || 'mock-model',
      provider: 'mock',
    };
  },
};


