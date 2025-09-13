interface TopicQuestionListProps {
  children?: React.ReactNode;
}

export default function TopicQuestionList({ children }: Readonly<TopicQuestionListProps>) {
  return <div className="border rounded-xl shadow-xs overflow-hidden">{children}</div>;
}
