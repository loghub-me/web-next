interface Series extends Timestamps {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  stats: SeriesStats;
  writer: UserSimple;
  topics: Topic[];
}

interface SeriesDetail extends Timestamps {
  id: number;
  slug: string;
  title: string;
  content: string;
  thumbnail: string;
  stats: SeriesStats;
  writer: User;
  topics: Topic[];
  chapters: SeriesChapter[];
}

interface SeriesStats {
  starCount: number;
  reviewCount: number;
}

interface SeriesChapter extends Timestamps {
  id: number;
  title: string;
  sequence: number;
}

interface SeriesChapterDetail extends Timestamps {
  id: number;
  title: string;
  content: Content;
  anchors: Anchor[];
  sequence: number;
}

interface SeriesReview extends Timestamps {
  id: number;
  content: string;
  rating: number;
  writer: UserSimple;
}

type SeriesSort = 'latest' | 'oldest' | 'relevant' | 'trending';
