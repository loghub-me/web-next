import { buildAssetsUrl, cn } from '@/lib/utils';
import Image from 'next/image';

const ASPECT_OPTIONS: Record<ThumbnailAspectRatio, string> = {
  '16:9': 'aspect-video',
  '3:4': 'aspect-[3/4]',
};

export interface ThumbnailProps {
  aspect: ThumbnailAspectRatio;
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: 'eager' | 'lazy';
}

export default function Thumbnail({ aspect, src, alt, width, height, loading = 'lazy' }: Readonly<ThumbnailProps>) {
  return (
    <div className={cn('relative bg-muted border rounded-lg overflow-hidden group', ASPECT_OPTIONS[aspect])}>
      <Image
        src={buildAssetsUrl(src)}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className="object-cover rounded-xl transition-[scale] group-hover:scale-115"
      />
    </div>
  );
}
