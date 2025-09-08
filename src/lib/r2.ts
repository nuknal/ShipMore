import type { Buffer as BufferType } from 'node:buffer';
import { Buffer } from 'node:buffer';

import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export type FileObject = {
  Key?: string;
  LastModified?: Date;
  ETag?: string;
  Size?: number;
  StorageClass?: string;
};

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_BUCKET = process.env.R2_BUCKET!;

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

export async function uploadFile(file: BufferType, key: string) {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: file,
  });

  try {
    const response = await S3.send(command);
    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function uploadImageBase64(base64Image: string, key: string) {
  // 解析 Content-Type
  const match = base64Image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
  if (!match) {
    throw new Error('无效的 base64 图像数据');
  }
  const contentType = match[1];
  const base64Data = Buffer.from(base64Image.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, ''), 'base64');

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: base64Data,
    ContentType: contentType,
  });

  try {
    const response = await S3.send(command);
    return response;
  } catch (error) {
    console.error('上传 base64 图像失败:', error);
    throw new Error('上传 base64 图像失败');
  }
}

export async function getSignedUrlForUpload(
  key: string,
  contentType: string,
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  try {
    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 120 });
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
}

export async function getSignedUrlForDownload(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
  });

  try {
    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 900 });
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
}

export async function listFiles(prefix: string = ''): Promise<FileObject[]> {
  const command = new ListObjectsV2Command({
    Bucket: R2_BUCKET,
    Prefix: prefix,
  });

  try {
    const response = await S3.send(command);
    return response.Contents || [];
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
}

export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
  });

  try {
    const response = await S3.send(command);
    return response;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

export async function uploadImageBase64AndGetUrl(base64Image: string, key: string): Promise<string> {
  await uploadImageBase64(base64Image, key);
  return await getSignedUrlForDownload(key);
}
