import type { AxiosError } from "axios";

type FieldErrorDetail = {
  field: string;
  message: string;
};

// Formato de erro da API: { status, error, message, path, fieldErrors }
type ApiErrorBody = {
  message?: string;
  fieldErrors?: FieldErrorDetail[];
};

export function getApiErrorMessage(error: unknown, fallback: string): string {
  const data = (error as AxiosError<ApiErrorBody>).response?.data;

  if (data?.fieldErrors?.length) {
    return data.fieldErrors.map((fieldError) => fieldError.message).join(" ");
  }

  return data?.message || fallback;
}
