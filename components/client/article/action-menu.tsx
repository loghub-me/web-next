'use client';

import { deleteArticle } from '@/apis/client/article';
import { useAuth } from '@/hooks/use-auth';
import { handleError } from '@/lib/error';
import { Button, ButtonLink } from '@ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@ui/dropdown-menu';
import { MenuIcon, PencilIcon, TrashIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ArticleActionMenuProps {
  id: number;
  slug: string;
  writer: User;
}

export default function ArticleActionMenu({ id, slug, writer }: Readonly<ArticleActionMenuProps>) {
  const { session } = useAuth();

  return (
    session?.username === writer.username && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'icon'} className="rounded-full">
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1">
          <ArticleEditLink slug={slug} writer={writer} />
          <ArticleDeleteButton id={id} />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}

function ArticleEditLink({ slug, writer }: Readonly<Pick<ArticleActionMenuProps, 'slug' | 'writer'>>) {
  return (
    <ButtonLink href={`/@${writer.username}/articles/${slug}/edit`} variant={'ghost'} size={'sm'}>
      <PencilIcon /> 수정하기
    </ButtonLink>
  );
}

function ArticleDeleteButton({ id }: Readonly<Pick<ArticleActionMenuProps, 'id'>>) {
  const router = useRouter();

  function onDeleteButtonClick() {
    deleteArticle(id)
      .then(({ message }) => {
        toast.success(message, { icon: <TrashIcon className="size-4" /> });
        router.replace('/search/articles');
      })
      .catch(handleError);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'sm'}>
          <TrashIcon className="mr-0.5" /> 삭제하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>삭제된 아티클은 복구할 수 없습니다. 정말로 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              <XIcon /> 취소하기
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive" onClick={onDeleteButtonClick}>
            <TrashIcon /> 삭제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
