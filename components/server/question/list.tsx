interface QuestionListProps {
  children?: React.ReactNode;
}

export default function QuestionList({ children }: Readonly<QuestionListProps>) {
  return <div className="border rounded-xl shadow-xs overflow-hidden">{children}</div>;
}
