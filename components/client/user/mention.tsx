import Link from 'next/link';

interface UserMentionProps {
  username: string;
}

export default function UserMention({ username }: Readonly<UserMentionProps>) {
  return (
    <Link
      href={`/${username}`}
      prefetch={false}
      className="text-sm bg-primary/20 px-1 py-0.5 rounded-sm mr-1 transition-colors hover:bg-primary/40"
    >
      @{username}
    </Link>
  );
}
