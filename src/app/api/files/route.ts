import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { deleteFile, getSignedUrlForDownload, listFiles } from '@/lib/r2';
import { ApiResponseHelper } from '@/types/api';

export async function GET() {
  try {
    const files = await listFiles();
    return NextResponse.json(ApiResponseHelper.success(files));
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json(ApiResponseHelper.error('errors.files.list_failed'), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { key } = await request.json();

  try {
    const signedUrl = await getSignedUrlForDownload(key);
    return NextResponse.json(ApiResponseHelper.success({ signedUrl }));
  } catch (error) {
    console.error('Error generating download URL:', error);
    return NextResponse.json(
      ApiResponseHelper.error('errors.files.download_url_failed'),
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { key } = await request.json();

  try {
    await deleteFile(key);
    return NextResponse.json(ApiResponseHelper.success({ message: 'File deleted successfully' }));
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(ApiResponseHelper.error('errors.files.delete_failed'), { status: 500 });
  }
}
