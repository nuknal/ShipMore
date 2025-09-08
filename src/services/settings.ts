import type { Settings, SettingsApiResponse, UpdateSettingsRequest } from '@/types/settings';
import { ApiResponseHelper } from '@/types/api';
import { fetchWithAuth } from './auth-fetch';

/**
 * 获取用户设置
 * @returns 用户设置响应
 */
export async function getUserSettings(): Promise<SettingsApiResponse> {
  try {
    const response = await fetchWithAuth('/api/settings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return ApiResponseHelper.error('errors.services.settings.get_failed');
    }

    return await response.json();
  } catch (error) {
    console.error('get settings failed:', error);
    return ApiResponseHelper.error(error instanceof Error ? error.message : 'errors.services.settings.get_failed');
  }
}

/**
 * 更新用户设置
 * @param settings 要更新的设置
 * @returns 更新结果响应
 */
export async function updateUserSettings(settings: Partial<Settings>): Promise<SettingsApiResponse> {
  try {
    const request: UpdateSettingsRequest = { settings };
    const response = await fetchWithAuth('/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      return ApiResponseHelper.error('errors.services.settings.update_failed');
    }

    return await response.json();
  } catch (error) {
    console.error('update settings failed:', error);
    return ApiResponseHelper.error(error instanceof Error ? error.message : 'errors.services.settings.update_failed');
  }
}
