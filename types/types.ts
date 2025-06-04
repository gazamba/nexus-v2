export type ActionResult<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]> | string;
};
