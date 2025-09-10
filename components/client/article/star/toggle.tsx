'use client';

import { addArticleStar, existsArticleStar, removeArticleStar } from '@/apis/client/article';
import { ErrorMessage } from '@/constants/messages';
import { useAuth } from '@/hooks/use-auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import StarIcon from '@ui/star-icon';
import { useState } from 'react';
import { toast } from 'sonner';

interface ArticleStarToggleProps {
  id: number;
  starCount: number;
}

export default function ArticleStarToggle({
  id: articleId,
  starCount: defaultStarCount,
}: Readonly<ArticleStarToggleProps>) {
  const queryClient = useQueryClient();
  const { status } = useAuth();

  const queryKey = ['existsArticleStar', articleId];
  const { data: exists, isLoading: existsLoading } = useQuery({
    queryKey,
    queryFn: () => existsArticleStar(articleId).then(({ data }) => data),
    enabled: status === 'authenticated',
  });
  const [starCount, setStarCount] = useState(defaultStarCount);
  const { mutate, isPending } = useMutation({
    mutationFn: (currentExists: boolean) => (currentExists ? removeArticleStar(articleId) : addArticleStar(articleId)),
    onMutate: async (currentExists: boolean) => {
      setStarCount((prev) => (currentExists ? prev - 1 : prev + 1));
      const prevExists = queryClient.getQueryData(['existsArticleStar', articleId]);
      queryClient.setQueryData(queryKey, !currentExists);
      return { prevExists };
    },
    onError: (_err, currentExists: boolean, context) => {
      setStarCount((prev) => (currentExists ? prev + 1 : prev - 1));
      queryClient.setQueryData(queryKey, context?.prevExists);
      toast.error(ErrorMessage.UNKNOWN);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  function onButtonClick() {
    if (status === 'unauthenticated') {
      toast.error(ErrorMessage.LOGIN_REQUIRED);
      return;
    }
    mutate(Boolean(exists));
  }

  return (
    <Button
      variant="outline"
      className="px-2.5 bg-card rounded-full"
      onClick={onButtonClick}
      disabled={existsLoading || isPending}
    >
      <StarIcon fill={exists} />
      <span className="font-mono text-xs">{starCount}</span>
    </Button>
  );
}
