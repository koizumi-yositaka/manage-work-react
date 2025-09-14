import { useQuery } from '@tanstack/react-query';
import { quizApi } from '@/api/quizApi';

export const useQuizSituation = (userName: string) => {
  const accessToken = localStorage.getItem('auth-token');
  
  return useQuery({
    queryKey: ['quizSituation', userName],
    queryFn: () => {
      if (!accessToken) {
        throw new Error('Access token not found');
      }
      return quizApi.getSituation(accessToken);
    },
    enabled: !!accessToken, // accessTokenが存在する場合のみクエリを実行
    staleTime: 60 * 1000, // 1分間は新鮮とみなす
    gcTime: 60 * 1000, // 1分間キャッシュを保持
  });
};
