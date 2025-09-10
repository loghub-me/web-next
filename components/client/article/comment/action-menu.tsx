'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@ui/button';
import { ReplyIcon } from 'lucide-react';

interface ArticleCommentActionMenuProps {
  replying: boolean;
  setReplying: React.Dispatch<React.SetStateAction<boolean>>;
  deleted: boolean;
}

export default function ArticleCommentActionMenu({
  replying,
  setReplying,
  deleted,
}: Readonly<ArticleCommentActionMenuProps>) {
  const { status } = useAuth();

  return (
    status === 'authenticated' && (
      <div className="ml-2 flex gap-1">
        {!deleted && (
          <Button
            variant={replying ? 'secondary' : 'ghost'}
            size={'icon'}
            className="size-6 rounded-full"
            onClick={() => setReplying((prev) => !prev)}
          >
            <ReplyIcon className="size-3 text-muted-foreground" />
          </Button>
        )}
      </div>
    )
  );
}
