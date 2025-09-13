interface TopicDetailAsideProps {
  children?: React.ReactNode;
}

export default function TopicDetailAside({ children }: Readonly<TopicDetailAsideProps>) {
  return <aside className="md:max-w-xs w-full h-fit flex flex-col gap-4 items-center">{children}</aside>;
}
