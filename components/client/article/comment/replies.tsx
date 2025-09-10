'use client';

import { getArticleCommentReplies } from '@/apis/client/article';
import { ArticleCommentListItem, ArticleCommentListSkeleton } from '@/components/client/article';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { useState } from 'react';

interface ArticleCommentRepliesProps {
  articleId: number;
  parentId: number;
  replyCount: number;
  commentsQueryKey: (string | number)[];
}

export default function ArticleCommentReplies({
  articleId,
  parentId,
  replyCount,
  commentsQueryKey,
}: Readonly<ArticleCommentRepliesProps>) {
  const [load, setLoad] = useState(false);
  const repliesQueryKey = ['getArticleCommentReplies', articleId, parentId];
  const { data: replies, status } = useQuery({
    queryKey: repliesQueryKey,
    queryFn: () => getArticleCommentReplies(articleId, parentId),
    enabled: load,
  });

  if (!load) {
    return (
      <Button variant={'link'} className="p-0 h-7 text-xs" onClick={() => setLoad(true)}>
        {replyCount}개의 답글
      </Button>
    );
  }

  if (status === 'pending') {
    return <ArticleCommentListSkeleton size={1} />;
  }

  return replies?.map((reply) => (
    <ArticleCommentListItem
      key={reply.id}
      articleId={articleId}
      comment={reply}
      commentsQueryKey={commentsQueryKey}
      repliesQueryKey={repliesQueryKey}
    />
  ));
}
