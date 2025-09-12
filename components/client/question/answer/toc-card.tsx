'use client';

import { useTOC } from '@/hooks/use-toc';
import { ButtonLink } from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import ListEmpty from '@ui/list-empty';

interface QuestionAnswerTOCCardProps {
  answers: QuestionAnswer[];
}

export default function QuestionAnswerTOCCard({ answers }: Readonly<QuestionAnswerTOCCardProps>) {
  const anchors = answers.map(({ id, title }) => ({ slug: `answer-${id}`, text: title, level: 1 }));
  const activeSlug = useTOC(anchors);

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="pl-2 text-sm text-muted-foreground">답변</CardTitle>
      </CardHeader>
      <CardContent className="px-4 flex flex-col gap-0.5">
        {answers.length === 0 && <ListEmpty message={'아직 답변이 등록되지 않았습니다'} />}
        {anchors.map(({ slug, text }) => (
          <ButtonLink
            key={slug}
            href={`#${encodeURIComponent(slug)}`}
            size={'sm'}
            variant={activeSlug === slug ? 'secondary' : 'ghost'}
            className="px-2 py-1.5 min-h-9 h-auto justify-start whitespace-normal"
          >
            {text}
          </ButtonLink>
        ))}
      </CardContent>
    </Card>
  );
}
