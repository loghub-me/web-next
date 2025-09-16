import { buildAssetsUrl, cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { cva, type VariantProps } from 'class-variance-authority';

const avatarVariants = cva('border', {
  variants: {
    size: {
      default: 'size-6',
      sm: 'size-5',
      xl: 'size-64',
    },
  },
  defaultVariants: { size: 'default' },
});

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
  id: number;
  username: string;
  className?: string;
}

export default function UserAvatar({ id, username, size, className }: Readonly<UserAvatarProps>) {
  return (
    <Avatar className={cn(avatarVariants({ size, className }))}>
      <AvatarImage src={buildAssetsUrl(`/${id}/avatar.webp`)} />
      <AvatarFallback className="text-xs">{username[0]}</AvatarFallback>
    </Avatar>
  );
}
