interface Series extends Timestamps {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  stats: SeriesStats;
  writer: UserSimple;
  topics: Topic[];
}

interface SeriesStats {
  starCount: number;
  reviewCount: number;
}

type SeriesSort = 'latest' | 'oldest' | 'relevant' | 'trending';
