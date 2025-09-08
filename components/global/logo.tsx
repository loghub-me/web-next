import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 128, height = 32, className }: Readonly<LogoProps>) {
  return (
    <Image
      className={cn('dark:invert', className)}
      src={'/logo.svg'}
      alt={'Logo'}
      width={width}
      height={height}
      priority
    />
  );
}
