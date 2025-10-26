import Image, { ImageProps } from 'next/image';

export default function ThemedImage({
  ...props
}: Readonly<
  Omit<ImageProps, 'src' | 'priority' | 'loading'> & {
    src: {
      light: string;
      dark: string;
    };
  }
>) {
  const { src, alt, ...rest } = props;

  return (
    <>
      <div data-hide-on-theme="dark">
        <Image src={src.light} alt={alt} loading={'lazy'} {...rest} />
      </div>
      <div data-hide-on-theme="light">
        <Image src={src.dark} alt={alt} loading={'lazy'} {...rest} />
      </div>
    </>
  );
}
