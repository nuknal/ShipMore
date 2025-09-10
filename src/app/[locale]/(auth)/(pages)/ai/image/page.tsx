'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { aiImage } from '@/services/ai';

export default function ImageDemoPage() {
  const [prompt, setPrompt] = useState('Hello Image');
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onGenerate = async () => {
    setLoading(true);
    setError(null);
    const res = await aiImage({ prompt, size: '512x512' });
    setLoading(false);
    if (!res.success || !res.data) {
      setError(res.error || 'Request failed');
      return;
    }
    setUrl(res.data.url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Image Demo</h1>
      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="flex gap-2">
            <Input value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Prompt" />
            <Button onClick={onGenerate} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</Button>
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          {url && (
            <div className="mt-4">
              <img src={url} alt="generated" className="max-h-96 rounded border" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
