export type ServerError = {
  status: number;
  code?: string;
  message: string;
};

export interface GeneralServerResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ServerError;
}
