import { useSnackbar } from "@/hooks/context/useSnackbar";
import { QueryClient, MutationObserverOptions, QueryObserverOptions } from "@tanstack/react-query";

export function errorHandler(error: unknown): void {
  const { showError } = useSnackbar();

  if (error instanceof Error) {
    showError(`${String(error.cause)}: ${error.message}`);
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
        onError: errorHandler,
    } as unknown as QueryObserverOptions<unknown, Error>,  // TypeScript error fix for queries
    mutations: {
      onError: errorHandler,
    } as MutationObserverOptions<unknown, Error, unknown, unknown>,  // Fixed types for mutations
  },
});
