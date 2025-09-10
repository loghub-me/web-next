import { ArticleCommentActionMenu } from '@/components/client/article';
import ArticleCommentForm from '@/components/client/article/comment/form';
import { UserLink, UserMention } from '@/components/client/user';
import { cn } from '@/lib/utils';
import Timestamp from '@ui/timestamp';
import { DotIcon } from 'lucide-react';
import { useState } from 'react';

interface ArticleCommentListItemProps {
  articleId: number;
  comment: ArticleComment;
  commentsQueryKey: (string | number)[];
  repliesQueryKey: (string | number)[];
  children?: React.ReactNode;
}

export default function ArticleCommentListItem({
  articleId,
  comment,
  commentsQueryKey,
  repliesQueryKey,
  children: repliesChildren,
}: Readonly<ArticleCommentListItemProps>) {
  const { writer, content, mention, deleted } = comment;
  const [replying, setReplying] = useState(false);

  return (
    <div>
      <div className="flex items-center">
        <UserLink {...writer} variant={'link'} />
        <DotIcon className="text-muted-foreground" />
        <Timestamp {...comment} />
        <ArticleCommentActionMenu replying={replying} setReplying={setReplying} deleted={deleted} />
      </div>
      <div className="pl-7.5 space-y-1">
        <p className="leading-6 text-sm">
          {mention && <UserMention {...mention} />}
          <span className={cn(deleted && 'text-muted-foreground')}>{content}</span>
        </p>
        {replying && (
          <ArticleCommentForm
            articleId={articleId}
            parent={comment}
            queryKeys={[commentsQueryKey, repliesQueryKey]}
            closeForm={() => setReplying(false)}
          />
        )}
        {repliesChildren}
      </div>
    </div>
  );
}
