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
  width?: number;
  height?: number;
  fill?: boolean;
  loading?: 'eager' | 'lazy';
}

const defaultProps: Pick<ThumbnailProps, 'fill' | 'loading'> = {
  fill: false,
  loading: 'lazy',
};

function Thumbnail(props: ThumbnailProps) {
  props = {
    ...defaultProps,
    ...props,
    src: buildAssetsUrl(props.src),
  };

  return (
    <div className={cn('relative bg-muted border rounded-lg overflow-hidden', ASPECT_OPTIONS[props.aspect])}>
      <Image {...props} className="object-contain" />
    </div>
  );
}

function InteractiveThumbnail(props: ThumbnailProps) {
  props = {
    ...defaultProps,
    ...props,
    src: buildAssetsUrl(props.src),
  };

  return (
    <div className={cn('relative bg-muted border rounded-lg overflow-hidden group', ASPECT_OPTIONS[props.aspect])}>
      <div className="absolute inset-0 transition-colors group-hover:bg-black/10" />
      <Image
        {...props}
        className={cn(
          'transition-[scale] group-hover:scale-105',
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        )}
      />
    </div>
  );
}

export { Thumbnail, InteractiveThumbnail };
