export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  model?: string;
  messages: ChatMessage[];
  stream?: boolean;
}

export interface ChatResponse {
  content: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
    durationMs?: number;
  };
  model?: string;
  provider?: string;
}

export interface ProviderOptions {
  apiKey?: string;
  baseURL?: string;
  provider?: 'openai' | 'proxy' | 'mock';
}

export interface LlmAdapter {
  chat(req: ChatRequest, opts: ProviderOptions): Promise<ChatResponse>;
}


