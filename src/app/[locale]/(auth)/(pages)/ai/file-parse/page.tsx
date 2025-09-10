'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { aiFileParse, getSignedUrlForR2Upload, putToSignedUrl } from '@/services/ai';

export default function FileParseDemoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onUpload = async () => {
    if (!file) {
      return;
    }
    setLoading(true);
    setError(null);
    const key = `uploads/${Date.now()}_${file.name}`;
    const signed = await getSignedUrlForR2Upload({ file, key });
    if (!signed) {
      setError('Get signed URL failed');
      setLoading(false);
      return;
    }
    const ok = await putToSignedUrl(signed, file);
    if (!ok) {
      setError('Upload failed');
      setLoading(false);
      return;
    }
    setFileKey(key);
    setLoading(false);
  };

  const onSummarize = async () => {
    if (!fileKey) {
      return;
    }
    setLoading(true);
    setError(null);
    const res = await aiFileParse({ fileKey, task: 'summarize' });
    setLoading(false);
    if (!res.success || !res.data) {
      setError(res.error || 'Request failed');
      return;
    }
    setResult(res.data.summary || '');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">File Parse Demo</h1>
      <Card>
        <CardContent className="space-y-4 p-4">
          <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
          <div className="flex gap-2">
            <Button onClick={onUpload} disabled={loading || !file}>{loading ? 'Uploading...' : 'Upload'}</Button>
            <Button onClick={onSummarize} disabled={loading || !fileKey}>{loading ? 'Summarizing...' : 'Summarize'}</Button>
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          {result && <pre className="whitespace-pre-wrap rounded border p-3 text-sm">{result}</pre>}
        </CardContent>
      </Card>
    </div>
  );
}
