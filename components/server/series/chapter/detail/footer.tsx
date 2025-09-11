import { ButtonLink } from '@ui/button';
import { CardFooter } from '@ui/card';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface SeriesChapterDetailHeaderProps {
  prefixPath: string;
  sequence: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function SeriesChapterDetailHeader(props: Readonly<SeriesChapterDetailHeaderProps>) {
  const { prefixPath, sequence, hasPrev, hasNext } = props;

  return (
    <CardFooter className="flex items-center justify-between gap-2">
      <ButtonLink href={`${prefixPath}/${sequence - 1}`} variant={'outline'} disabled={!hasPrev}>
        <ChevronLeftIcon /> 이전 챕터
      </ButtonLink>
      <span className="text-muted-foreground font-semibold">{sequence}</span>
      <ButtonLink href={`${prefixPath}/${sequence + 1}`} variant={'outline'} disabled={!hasNext}>
        다음 챕터 <ChevronRightIcon />
      </ButtonLink>
    </CardFooter>
  );
}
