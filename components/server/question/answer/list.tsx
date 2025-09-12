interface QuestionAnswerListProps {
  children?: React.ReactNode;
}

export default function QuestionAnswerList({ children }: Readonly<QuestionAnswerListProps>) {
  return <div className="space-y-4">{children}</div>;
}
