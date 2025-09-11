import { UserLink } from '@/components/client/user';
import Timestamp from '@ui/timestamp';
import { DotIcon } from 'lucide-react';

interface ArticleDetailHeroProps {
  title: string;
  writer: User;
  createdAt: string;
  updatedAt: string;
}

export default function ArticleDetailHero({ title, writer, createdAt, updatedAt }: Readonly<ArticleDetailHeroProps>) {
  return (
    <div className="px-4 py-16 space-y-4">
      <h2 className="text-center font-semibold text-2xl">{title}</h2>
      <div className="mt-auto flex items-center justify-center">
        <UserLink {...writer} />
        <DotIcon className="text-muted-foreground mr-1" />
        <Timestamp createdAt={createdAt} updatedAt={updatedAt} className="text-sm" />
      </div>
    </div>
  );
}
