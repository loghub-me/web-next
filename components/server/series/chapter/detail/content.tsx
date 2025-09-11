import { CardContent } from '@ui/card';

interface SeriesChapterDetailContentProps {
  content: { html: string };
}

export default function SeriesChapterDetailContent({ content }: Readonly<SeriesChapterDetailContentProps>) {
  return (
    <CardContent className="space-y-4">
      <div className="markdown-it" dangerouslySetInnerHTML={{ __html: content.html }} />
    </CardContent>
  );
}
