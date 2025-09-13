import { getUserStars } from '@/apis/server/user';
import { PageNav, PageSkeleton } from '@/components/client/page';
import { StarList, StarListItem, StarListSkeleton } from '@/components/server/star';
import { parseObject } from '@/lib/parse';
import { userDetailSchema, userStarSearchSchema } from '@/schemas/user';
import ListEmpty from '@ui/list-empty';
import { Suspense } from 'react';

export default async function UserStarSearchPage({ params, searchParams }: PageProps<'/[username]/stars'>) {
  const parsedParam = parseObject(await params, userDetailSchema);
  const parsedSearchParams = parseObject(await searchParams, userStarSearchSchema);
  const stars = getUserStars(parsedParam.username, parsedSearchParams);

  return (
    <div className="space-y-4">
      <StarList hasAside={true}>
        <Suspense fallback={<StarListSkeleton />}>
          <StarListItems stars={stars} />
        </Suspense>
      </StarList>
      <Suspense fallback={<PageSkeleton />}>
        <StarPageNav currentPage={parsedSearchParams.page} stars={stars} />
      </Suspense>
    </div>
  );
}

interface StarListItemsProps {
  stars: Promise<Page<UserStar>>;
}

export async function StarListItems({ stars }: Readonly<StarListItemsProps>) {
  const resolvedStars = await stars;

  if (resolvedStars.content.length === 0) {
    return <ListEmpty message={'스타된 포스트가 없습니다.'} className="py-4" />;
  }

  return resolvedStars.content.map((star) => <StarListItem key={star.id} star={star} />);
}

interface StarPageNavProps extends StarListItemsProps {
  currentPage: number;
}

export async function StarPageNav({ currentPage, stars }: Readonly<StarPageNavProps>) {
  const resolvedStars = await stars;
  return <PageNav currentPage={currentPage} totalPages={resolvedStars.page.totalPages} />;
}
