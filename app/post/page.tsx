import ThemedImage from '@/components/global/themed-image';
import { POST_LINKS } from '@/constants/links';
import { cn } from '@/lib/utils';
import { LightRays } from '@ui/light-rays';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

export default function PostPortalPage() {
  return (
    <main className="mx-auto p-4 pt-20 max-w-3xl w-full min-h-screen space-y-4">
      <div className="py-12 space-y-4 text-center">
        <h2 className="text-center font-semibold text-2xl">무엇을 작성하시겠어요?</h2>
        <p className="text-sm text-muted-foreground">
          아티클, 시리즈, 질문, 답변 등 다양한 글을 작성하고 공유해보세요.
        </p>
      </div>
      <PostBentoGrid>
        {POST_LINKS.map((card) => (
          <PostBentoGridItem key={card.href} {...card} />
        ))}
      </PostBentoGrid>
    </main>
  );
}

interface PostBentoGridProps {
  children: React.ReactNode;
}

function PostBentoGrid({ children }: Readonly<PostBentoGridProps>) {
  return <div className="grid grid-cols-1 md:grid-cols-5 gap-4">{children}</div>;
}

interface PostBentoGridItemProps {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  style: string;
  image: {
    light: string;
    dark: string;
  };
}

function PostBentoGridItem({ href, title, description, style, image, icon: Icon }: Readonly<PostBentoGridItemProps>) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative h-56 border rounded-xl shadow-xs transition-colors bg-card/50 hover:bg-card overflow-hidden',
        style
      )}
    >
      <LightRays
        raysColor="#00ffff"
        lightSpread={1.5}
        className="custom-rays opacity-0 transition-opacity group-hover:opacity-50 dark:group-hover:opacity-50 duration-500"
      />
      <ThemedImage
        src={image}
        alt={title}
        className="object-cover object-top transition-[filter] blur-xs group-hover:blur-sm duration-500"
        fill
      />
      <div className="absolute top-2 left-2 px-3 py-2 space-y-1.5 bg-card/50 border rounded-md backdrop-blur-sm transition-[top,left] group-hover:top-4 group-hover:left-4">
        <h3 className="font-semibold">
          <Icon className="size-4 inline-block mr-1" /> {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
