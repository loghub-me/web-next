import { redirect } from 'next/navigation';

export default async function TopicDetailPage({ params }: PageProps<'/topics/[slug]'>) {
  return redirect(`/topics/${(await params).slug}/articles`);
}
