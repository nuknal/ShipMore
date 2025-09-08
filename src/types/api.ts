export type ApiResponse<T = any> = {
  data?: T;
  error?: string;
  success: boolean;
  message?: string;
  code?: number;
  timestamp?: number;
};

export const ApiResponseHelper = {
  success: <T>(data: T, message?: string): ApiResponse<T> => ({
    success: true,
    data,
    message,
    timestamp: Date.now(),
  }),
  error: (error: string, code: number = 400): ApiResponse => ({
    success: false,
    error,
    code,
    timestamp: Date.now(),
  }),
};
