import type { NextRequest } from 'next/server';
import type { UpdateSettingsRequest } from '@/types/settings';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { settings } from '@/db/schema';
import { getUserId } from '@/lib/auth';
import { ApiResponseHelper } from '@/types/api';

/**
 * 获取用户设置
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        ApiResponseHelper.error('errors.auth.unauthorized'),
        { status: 401 },
      );
    }

    const language = request.headers.get('x-locale') || 'en';

    let userSettings = await db.select()
      .from(settings)
      .where(eq(settings.userId, userId))
      .limit(1);

    if (!userSettings || userSettings.length === 0) {
      userSettings = await db.insert(settings).values({
        userId,
        language,
      }).returning();
    }

    return NextResponse.json(ApiResponseHelper.success(userSettings[0]!));
  } catch (error) {
    console.error('获取设置错误:', error);
    return NextResponse.json(
      ApiResponseHelper.error('errors.settings.get_failed'),
      { status: 500 },
    );
  }
}

/**
 * 更新用户设置
 */
export async function PUT(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      return NextResponse.json(
        ApiResponseHelper.error('errors.auth.unauthorized'),
        { status: 401 },
      );
    }

    const body: UpdateSettingsRequest = await request.json();

    if (!body.settings) {
      return NextResponse.json(
        ApiResponseHelper.error('errors.settings.invalid_data'),
        { status: 400 },
      );
    }

    const userSettings = await db.update(settings)
      .set(body.settings)
      .where(eq(settings.userId, userId))
      .returning();

    return NextResponse.json(ApiResponseHelper.success(userSettings));
  } catch (error) {
    console.error('更新设置错误:', error);
    return NextResponse.json(
      ApiResponseHelper.error('errors.settings.update_failed'),
      { status: 500 },
    );
  }
}
