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
    <div
      className={cn(
        'relative flex items-center justify-center bg-muted border rounded-lg overflow-hidden',
        ASPECT_OPTIONS[props.aspect]
      )}
    >
      <Image {...props} alt={props.alt} />
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
    <div
      className={cn(
        'relative flex items-center justify-center bg-muted border rounded-lg overflow-hidden group',
        ASPECT_OPTIONS[props.aspect]
      )}
    >
      <div className="absolute inset-0 transition-colors group-hover:bg-black/10" />
      <Image {...props} className="transition-[scale] group-hover:scale-105" alt={props.alt} />
    </div>
  );
}

export { Thumbnail, InteractiveThumbnail };
