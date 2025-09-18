import ThemedImage from '@/components/global/themed-image';

interface TopicIconProps {
  slug: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | number;
}

export default function TopicIcon({ slug, name, size = 'sm' }: Readonly<TopicIconProps>) {
  const [width, height] =
    typeof size === 'number' ? [size, size] : size === 'sm' ? [16, 16] : size === 'md' ? [32, 32] : [48, 48];

  return (
    <ThemedImage
      src={{
        light: `/icons/${slug}.svg`,
        dark: `/icons/${slug}-dark.svg`,
      }}
      alt={name}
      width={width}
      height={height}
      skeletonClassName={'rounded-full'}
    />
  );
}
