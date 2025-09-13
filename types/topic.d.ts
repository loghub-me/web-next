interface Topic {
  name: string;
  slug: string;
}

interface TopicDetail {
  name: string;
  slug: string;
  description: string;
}

type TopicDetailView = 'articles' | 'series' | 'questions';
