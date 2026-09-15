import { HttpErrorResponse } from '@angular/common/http';

export function getAuthErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof HttpErrorResponse)) {
    return fallback;
  }

  if (error.status === 401 || error.status === 403) {
    return 'E-mail ou senha incorretos.';
  }

  if (typeof error.error === 'string' && error.error.trim()) {
    return error.error;
  }

  if (isMessageBody(error.error) && error.error.message) {
    return error.error.message;
  }

  return fallback;
}

function isMessageBody(value: unknown): value is { message: string } {
  return typeof value === 'object' && value !== null
    && 'message' in value && typeof value.message === 'string';
}
