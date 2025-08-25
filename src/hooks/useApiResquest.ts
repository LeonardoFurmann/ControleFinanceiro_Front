import { AxiosError } from "axios";

export type RequestResult =
  | { success: true; data?: any }
  | { success: false; message: string };

export function useApiRequest() {
  const execute = async <T>(apiCall: () => Promise<{ data: T }>): Promise<RequestResult> => {
    try {
      const { data } = await apiCall();
      return { success: true, data };
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      return {
        success: false,
        message: err.response?.data?.error || "Erro inesperado. Tente novamente.",
      };
    }
  };

  return { execute };
}
