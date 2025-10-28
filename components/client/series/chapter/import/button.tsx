'use client';

import { importSeriesChapter } from '@/apis/client/series';
import { searchArticlesForImport } from '@/apis/client/user';
import { TopicLink } from '@/components/client/topic';
import { useAuth } from '@/hooks/use-auth';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { handleError } from '@/lib/error';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { InputWithIcon } from '@ui/input';
import ListEmpty from '@ui/list-empty';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@ui/sheet';
import { CopyIcon, FolderInputIcon, PlusIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

interface SeriesChapterImportButtonProps {
  seriesId: number;
}

export default function SeriesChapterImportButton({ seriesId }: Readonly<SeriesChapterImportButtonProps>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 200);

  const { status, session } = useAuth();
  const queryClient = useQueryClient();
  const { data: articles, isPending } = useQuery({
    queryKey: ['searchArticlesForImport', debouncedQuery],
    queryFn: () => searchArticlesForImport(debouncedQuery),
    enabled: status === 'authenticated',
  });

  function onImportButtonClick(articleId: number) {
    importSeriesChapter(seriesId, articleId)
      .then(({ message }) => {
        toast.success(message, { icon: <PlusIcon className="size-4" /> });
        queryClient.invalidateQueries({ queryKey: ['getSeriesForEdit', seriesId] });
      })
      .catch(handleError);
  }

  return (
    session && (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant={'secondary'} size={'sm'} className="border">
            <FolderInputIcon /> 아티클 불러오기
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="border-b">
            <SheetTitle>아티클 불러오기</SheetTitle>
            <SheetDescription>작성했던 아티클을 시리즈 챕터로 복제할 수 있습니다.</SheetDescription>
          </SheetHeader>
          <div className="px-4 space-y-4">
            <InputWithIcon
              icon={SearchIcon}
              type={'text'}
              name={'query'}
              placeholder={'검색어를 입력해주세요...'}
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
            <div className="border rounded-xl shadow-xs max-h-128 overflow-y-auto">
              {isPending && <ListEmpty message="검색 중..." />}
              {!isPending && articles && articles.length === 0 && <ListEmpty message="검색된 아티클이 없습니다." />}
              {!isPending &&
                articles &&
                articles.map(({ id, slug, title, topics }) => (
                  <div key={id} className="flex items-center gap-2 p-4 border-b last:border-b-0">
                    <div className="flex-1 space-y-1.5">
                      <h3 className="flex flex-wrap items-center">
                        <Link
                          href={`/articles/${session.username}/${slug}`}
                          prefetch={false}
                          className="line-clamp-2 font-medium transition-colors hover:text-accent-foreground/50"
                        >
                          {title}
                        </Link>
                      </h3>
                      {topics.length > 0 && (
                        <div className="mt-0.5 flex flex-wrap gap-1">
                          {topics.map((topic) => (
                            <TopicLink key={topic.slug} topic={topic} />
                          ))}
                        </div>
                      )}
                    </div>
                    <Button type={'button'} variant={'outline'} size={'icon'} onClick={() => onImportButtonClick(id)}>
                      <CopyIcon />
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  );
}
