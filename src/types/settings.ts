export type ColorTheme = 'coral' | 'blue' | 'green' | 'purple' | 'orange' | 'rose' | 'teal' | 'neutral';

export type Settings = {
  theme: 'light' | 'dark' | 'system';
  colorTheme: ColorTheme;
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  notificationEnabled: boolean;
  saveAnalysisHistory: boolean;
  saveChatHistory: boolean;
  allowDataCollection: boolean;
};

export type SettingsApiResponse = {
  success: boolean;
  data?: Settings;
  error?: string;
};

export type UpdateSettingsRequest = {
  settings: Partial<Settings>;
};
