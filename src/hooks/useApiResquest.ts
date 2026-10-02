import { useCallback } from "react";
import { getApiErrorMessage } from "../services/apiError";

export type RequestResult =
  | { success: true; data?: any }
  | { success: false; message: string };

export function useApiRequest() {
  const execute = useCallback(async <T>(apiCall: () => Promise<{ data: T }>): Promise<RequestResult> => {
    try {
      const { data } = await apiCall();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        message: getApiErrorMessage(error, "Erro inesperado. Tente novamente."),
      };
    }
  }, []);

  return { execute };
}
