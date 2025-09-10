import { buildAssetsUrl, cn } from '@/lib/utils';
import Image from 'next/image';

type AspectRatio = '16:9' | '3:4';

const ASPECT_OPTIONS: Record<AspectRatio, string> = {
  '16:9': 'aspect-video',
  '3:4': 'aspect-[3/4]',
};

interface ThumbnailProps {
  aspect: AspectRatio;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function Thumbnail({ aspect, src, alt, width, height }: Readonly<ThumbnailProps>) {
  return (
    <div className={cn('relative bg-muted border rounded-lg overflow-hidden group', ASPECT_OPTIONS[aspect])}>
      <Image
        src={buildAssetsUrl(`/${src}`)}
        alt={alt}
        width={width}
        height={height}
        className="object-cover rounded-xl transition-[scale] group-hover:scale-115"
      />
    </div>
  );
}
