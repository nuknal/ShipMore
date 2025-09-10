'use client';

import type { ChatMessage } from '@/services/ai';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { aiChat } from '@/services/ai';

export default function ChatDemoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'system', content: 'You are a helpful assistant.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSend = async () => {
    if (!input.trim()) {
      return;
    }
    setLoading(true);
    setError(null);
    const next = [...messages, { role: 'user', content: input } as ChatMessage];
    setMessages(next);
    setInput('');

    const res = await aiChat({ messages: next });
    setLoading(false);
    if (!res.success || !res.data) {
      setError(res.error || 'Request failed');
      return;
    }
    setMessages([...next, { role: 'assistant', content: res.data.content }]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Chat Demo</h1>
      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="h-96 overflow-auto rounded border p-3 text-sm">
            {messages.filter(m => m.role !== 'system').map((m, i) => (
              <div key={i} className="mb-2">
                <span className="font-semibold">
                  {m.role}
                  :
                </span>
                {' '}
                {m.content}
              </div>
            ))}
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <div className="flex gap-2">
            <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Say something..." />
            <Button onClick={onSend} disabled={loading}>{loading ? 'Sending...' : 'Send'}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
