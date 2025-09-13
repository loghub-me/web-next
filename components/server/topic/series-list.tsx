interface TopicSeriesListProps {
  children?: React.ReactNode;
}

export default function TopicSeriesList({ children }: Readonly<TopicSeriesListProps>) {
  return <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{children}</div>;
}
