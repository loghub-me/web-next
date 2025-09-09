interface Article extends Timestamps {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  stats: ArticleStats;
  writer: UserSimple;
  topics: Topic[];
}

interface ArticleStats {
  starCount: number;
  commentCount: number;
}

type ArticleSort = 'latest' | 'oldest' | 'relevant' | 'trending';
