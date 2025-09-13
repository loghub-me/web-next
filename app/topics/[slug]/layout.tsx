import { getTopicDetail } from '@/apis/server/topic';
import ThemedImage from '@/components/global/themed-image';
import { TopicDetailAside, TopicDetailAsideSkeleton } from '@/components/server/topic';
import { parseObject } from '@/lib/parse';
import { topicDetailSchema } from '@/schemas/topic';
import { Suspense } from 'react';

export default async function TopicDetailLayout({ params, children }: LayoutProps<'/topics/[slug]'>) {
  const parsedParam = parseObject(await params, topicDetailSchema);
  const topic = getTopicDetail(parsedParam.slug);

  return (
    <main className="container mx-auto p-4 pt-20 min-h-screen space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <TopicDetailAside>
          <Suspense fallback={<TopicDetailAsideSkeleton />}>
            <TopicDetailAsideContent topic={topic} />
          </Suspense>
        </TopicDetailAside>
        {children}
      </div>
    </main>
  );
}

interface TopicDetailAsideContentProps {
  topic: Promise<TopicDetail>;
}

async function TopicDetailAsideContent({ topic }: Readonly<TopicDetailAsideContentProps>) {
  const { slug, name, description } = await topic;

  return (
    <>
      <div className="relative w-xs aspect-square border rounded-xl shadow-xs overflow-hidden">
        <ThemedImage
          src={{
            light: `/icons/${slug}.svg`,
            dark: `/icons/${slug}-dark.svg`,
          }}
          alt={name}
          fill
        />
      </div>
      <div className="w-full space-y-1.5">
        <h3 className="font-semibold">{name}</h3>
        <p className="tex-sm text-muted-foreground">{description}</p>
      </div>
    </>
  );
}
