interface TopicArticleListProps {
  children?: React.ReactNode;
}

export default function TopicArticleList({ children }: Readonly<TopicArticleListProps>) {
  return <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{children}</div>;
}
