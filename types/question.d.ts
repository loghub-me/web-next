interface Question extends Timestamps {
  id: number;
  slug: string;
  title: string;
  status: QuestionStatus;
  stats: QuestionStats;
  writer: UserSimple;
  topics: Topic[];
}

interface QuestionStats {
  starCount: number;
  answerCount: number;
}

type QuestionStatus = 'OPEN' | 'CLOSED' | 'SOLVED';
type QuestionSort = 'latest' | 'oldest' | 'relevant' | 'trending';
type QuestionFilter = 'all' | 'open' | 'closed' | 'solved';
