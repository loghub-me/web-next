import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SymbolProps {
  size: number;
  className?: string;
}

export default function Symbol({ size, className }: Readonly<SymbolProps>) {
  return (
    <Image
      className={cn('dark:invert', className)}
      src={'/symbol.svg'}
      alt={'symbol'}
      width={size}
      height={size}
      priority
    />
  );
}
