import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5分間は新鮮とみなす
      gcTime: 10 * 60 * 1000, // 10分間キャッシュを保持
      retry: 1, // 失敗時は1回までリトライ
    },
  },
});
