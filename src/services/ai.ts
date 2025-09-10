'use client';

import type { ApiResponse } from '@/types/api';
import { ApiResponseHelper } from '@/types/api';
import { fetchWithAuth } from './auth-fetch';

export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export async function aiChat(params: {
  messages: ChatMessage[];
  model?: string;
  byok?: { apiKey?: string; baseURL?: string; provider?: string };
}): Promise<ApiResponse<{ content: string }>> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (params.byok?.apiKey) headers['X-LLM-API-Key'] = params.byok.apiKey;
    if (params.byok?.baseURL) headers['X-LLM-Base-URL'] = params.byok.baseURL;
    if (params.byok?.provider) headers['X-LLM-Provider'] = params.byok.provider;

    const res = await fetchWithAuth('/api/ai/chat', {
      method: 'POST',
      headers,
      body: JSON.stringify({ messages: params.messages, model: params.model }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'errors.ai.provider_error' }));
      return ApiResponseHelper.error(err.error || 'errors.ai.provider_error');
    }
    return res.json();
  } catch (error) {
    console.error('aiChat failed', error);
    return ApiResponseHelper.error('errors.ai.provider_error');
  }
}

export async function aiImage(params: {
  prompt: string;
  size?: '256x256' | '512x512' | '1024x1024';
  byok?: { apiKey?: string; baseURL?: string; provider?: string };
}): Promise<ApiResponse<{ url: string }>> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (params.byok?.apiKey) headers['X-LLM-API-Key'] = params.byok.apiKey;
    if (params.byok?.baseURL) headers['X-LLM-Base-URL'] = params.byok.baseURL;
    if (params.byok?.provider) headers['X-LLM-Provider'] = params.byok.provider;

    const res = await fetchWithAuth('/api/ai/image', {
      method: 'POST',
      headers,
      body: JSON.stringify({ prompt: params.prompt, size: params.size }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'errors.ai.provider_error' }));
      return ApiResponseHelper.error(err.error || 'errors.ai.provider_error');
    }
    return res.json();
  } catch (error) {
    console.error('aiImage failed', error);
    return ApiResponseHelper.error('errors.ai.provider_error');
  }
}

export async function aiFileParse(params: {
  fileKey: string;
  task?: 'summarize' | 'extract_text';
  model?: string;
  byok?: { apiKey?: string; baseURL?: string; provider?: string };
}): Promise<ApiResponse<{ summary?: string; text?: string }>> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (params.byok?.apiKey) headers['X-LLM-API-Key'] = params.byok.apiKey;
    if (params.byok?.baseURL) headers['X-LLM-Base-URL'] = params.byok.baseURL;
    if (params.byok?.provider) headers['X-LLM-Provider'] = params.byok.provider;

    const res = await fetchWithAuth('/api/ai/file-parse', {
      method: 'POST',
      headers,
      body: JSON.stringify({ fileKey: params.fileKey, task: params.task, model: params.model }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'errors.ai.provider_error' }));
      return ApiResponseHelper.error(err.error || 'errors.ai.provider_error');
    }
    return res.json();
  } catch (error) {
    console.error('aiFileParse failed', error);
    return ApiResponseHelper.error('errors.ai.provider_error');
  }
}

export async function getSignedUrlForR2Upload(params: { file: File; key: string }): Promise<string | null> {
  try {
    const res = await fetchWithAuth('/api/files/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: params.key,
        originalName: params.file.name,
        fileType: params.file.type,
        fileSize: params.file.size,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.signedUrl || null;
  } catch (error) {
    console.error('getSignedUrlForR2Upload failed', error);
    return null;
  }
}

export async function putToSignedUrl(url: string, file: File): Promise<boolean> {
  try {
    const putRes = await fetch(url, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
    return putRes.ok;
  } catch (error) {
    console.error('putToSignedUrl failed', error);
    return false;
  }
}


