import { QuestionActionMenu } from '@/components/client/question';
import { UserLink } from '@/components/client/user';
import { CardHeader } from '@ui/card';
import ScrollProgressBar from '@ui/scroll-progress-bar';

interface QuestionDetailHeaderProps {
  id: number;
  slug: string;
  writer: User;
  stats: { starCount: number };
}

export default function QuestionDetailHeader(props: Readonly<QuestionDetailHeaderProps>) {
  const { writer } = props;

  return (
    <CardHeader className="sticky top-0 z-50 w-full h-16 flex items-center justify-end gap-2 bg-card/70 backdrop-blur rounded-t-xl border-b">
      <UserLink {...writer} className={'mr-auto'} />
      <QuestionActionMenu {...props} />
      <ScrollProgressBar className={'fixed bottom-0 left-0 w-full'} />
    </CardHeader>
  );
}
