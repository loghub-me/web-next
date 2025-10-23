import { USER_ACTIVITY_ACTION_OPTIONS } from '@/constants/options';
import { Badge } from '@ui/badge';
import Timestamp from '@ui/timestamp';
import Link from 'next/link';

interface UserActivityListItemProps {
  activity: UserActivity;
  username: string;
}

export default function UserActivityListItem({ activity, username }: Readonly<UserActivityListItemProps>) {
  const { slug, title, action } = activity;
  const { path, label } = USER_ACTIVITY_ACTION_OPTIONS[action];
  const href = path.replace('{username}', username).replace('{slug}', slug);

  return (
    <div className="flex flex-row items-center gap-2 px-3 py-2">
      <Badge variant={'secondary'} className="px-1">
        {label}
      </Badge>
      <h3 className="font-medium line-clamp-1">
        <Link href={href} prefetch={false} className="mr-2 transition-colors hover:text-accent-foreground/50">
          {title}
        </Link>
      </h3>
      <Timestamp className="mt-1 ml-auto text-nowrap" {...activity} />
    </div>
  );
}
