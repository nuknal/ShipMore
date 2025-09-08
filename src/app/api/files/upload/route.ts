import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { files } from '@/db/schema';
import { getUserId } from '@/lib/auth';
import { getSignedUrlForUpload } from '@/lib/r2';
import { ApiResponseHelper } from '@/types/api';

export async function POST(request: NextRequest) {
  const { fileName, fileType, fileSize, originalName } = await request.json();

  const userId = await getUserId(request);
  if (!userId || userId === '') {
    return NextResponse.json(
      ApiResponseHelper.error('errors.files.upload_failed'),
      { status: 400 },
    );
  }

  try {
    await db.insert(files).values({
      key: fileName,
      originalName,
      contentType: fileType,
      size: fileSize,
      userId,
    });
  } catch (error) {
    console.error('Error inserting file:', error);
    return NextResponse.json(
      ApiResponseHelper.error('errors.files.upload_failed'),
      { status: 500 },
    );
  }

  try {
    const signedUrl = await getSignedUrlForUpload(fileName, fileType);
    return NextResponse.json(ApiResponseHelper.success({ signedUrl }));
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return NextResponse.json(
      ApiResponseHelper.error('errors.files.upload_failed'),
      { status: 500 },
    );
  }
}
