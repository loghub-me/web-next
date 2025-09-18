import {
  HomeFeatureActivityCalendar,
  HomeFeatureAnswerGenerate,
  HomeFeatureMarkdownEditor,
  HomeFeatureTabTrigger,
  HomeFeatureTopic,
} from '@/components/client/home';
import { TopicIcon } from '@/components/client/topic';
import Logo from '@/components/global/logo';
import { TOPICS } from '@/constants/topics';
import { ButtonLink } from '@ui/button';
import { OrbitingCircle } from '@ui/orbiting-circle';
import { Tabs, TabsContent, TabsList } from '@ui/tabs';
import { BotIcon, LayersIcon, MessagesSquareIcon, PencilIcon, ScrollIcon, SproutIcon, TagIcon } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen py-16">
      <HeroSection />
      <OrbitingCirclesSection />
      <ContentsSection />
      <FeaturesSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="px-4 py-16 flex flex-col items-center gap-6">
      <ButtonLink href={'/post'} variant={'outline'} className="pl-1.5 pr-2.5 rounded-full">
        <span className={'p-1 text-accent-foreground bg-accent border rounded-full'}>
          <PencilIcon className="size-3 stroke-2.5" />
        </span>
        지금 바로 시작해보세요!
      </ButtonLink>
      <Logo width={256} height={64} />
      <p className="text-center text-muted-foreground">
        LogHub는 개발자들이 자신의 지식을 공유하고, 서로의 경험을 나누는 공간입니다.
        <br />
        회원 가입 후 다양한 포스트를 작성하고, 다른 사람들과 소통해보세요!
      </p>
    </section>
  );
}

function OrbitingCirclesSection() {
  const circles = [TOPICS.slice(0, 7), TOPICS.slice(8, 15), TOPICS.slice(16, 23), TOPICS.slice(24, 31)];

  return (
    <section className="absolute -z-1 w-full h-[853px] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background from-30% to-50%"></div>
      {circles.map((circle, index) => (
        <OrbitingCircle
          key={index}
          iconSize={Math.round((42 - index * 6) * 1.25)}
          radius={Math.round((320 - index * 64) * 1.25)}
          speed={4 + index * 2}
          reverse={index % 2 === 0}
        >
          {circle.map((topic) => (
            <TopicIcon key={topic.slug} {...topic} size={Math.round((36 - index * 6) * 1.25)} />
          ))}
        </OrbitingCircle>
      ))}
    </section>
  );
}

function ContentsSection() {
  const CONTENTS = [
    {
      title: '아티클',
      description: '아티클은 다양한 주제에 대한 글을 작성하고 공유하는 공간입니다.',
      icon: ScrollIcon,
    },
    {
      title: '시리즈',
      description: '시리즈는 여러 아티클을 모아 하나의 주제로 구성된 글 모음입니다.',
      icon: LayersIcon,
    },
    {
      title: '질문',
      description: '질문은 사용자 간의 질문과 답변을 공유하는 공간입니다.',
      icon: MessagesSquareIcon,
    },
  ];

  return (
    <section className="container mt-[460px] mx-auto px-16 space-y-8">
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-semibold">주요 컨텐츠를 탐색하세요</h3>
        <p className="text-muted-foreground">
          다양한 주제의 아티클, 시리즈, 질문을 통해 지식을 확장하고 커뮤니티와 소통하세요.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {CONTENTS.map(({ title, description, icon: Icon }, index) => (
          <div key={index} className="w-full space-y-2">
            <span className="inline-block p-3 text-accent-foreground bg-accent rounded-full">
              <Icon className="size-6" />
            </span>
            <div className="px-1 space-y-1">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  const FEATURES = [
    {
      value: 'markdown-editor',
      title: '마크다운 에디터',
      description: '포스트 작성 시, 마크다운 형식으로 작성할 수 있는 에디터를 제공합니다.',
      icon: PencilIcon,
    },
    {
      value: 'answer-generate',
      title: 'AI 답변 요청',
      description: '질문 등록 시, 답변봇에게 답변을 요청할 수 있습니다.',
      icon: BotIcon,
    },
    {
      value: 'activity-calendar',
      title: '활동 캘린더',
      description: '포스트 작성 시, 잔디 모양의 캘린더를 통해 활동을 시각적으로 확인할 수 있습니다.',
      icon: SproutIcon,
    },
    {
      value: 'topic',
      title: '토픽',
      description: '포스트 작성 시, 관련된 토픽을 선택하여 콘텐츠를 분류할 수 있습니다.',
      icon: TagIcon,
    },
  ];

  return (
    <section className="container mt-16 mx-auto px-4 space-y-8">
      <div className="px-12 space-y-2 text-center">
        <h3 className="text-xl font-semibold">다양한 기능을 사용해보세요.</h3>
        <p className="text-muted-foreground">
          LogHub는 사용자들이 더 나은 경험을 할 수 있도록 다양한 기능을 제공합니다.
        </p>
      </div>
      <Tabs defaultValue={FEATURES[0].value} className="flex flex-col lg:flex-row gap-4">
        <TabsList className="lg:max-w-1/3 flex flex-col gap-1 items-center">
          {FEATURES.map((feature) => (
            <HomeFeatureTabTrigger key={feature.value} {...feature} />
          ))}
        </TabsList>
        <TabsContent value={'markdown-editor'}>
          <HomeFeatureMarkdownEditor />
        </TabsContent>
        <TabsContent value={'answer-generate'}>
          <HomeFeatureAnswerGenerate />
        </TabsContent>
        <TabsContent value={'activity-calendar'}>
          <HomeFeatureActivityCalendar />
        </TabsContent>
        <TabsContent value={'topic'}>
          <HomeFeatureTopic />
        </TabsContent>
      </Tabs>
    </section>
  );
}
