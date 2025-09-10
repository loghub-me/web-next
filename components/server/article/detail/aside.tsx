interface ArticleDetailAsideProps {
  children?: React.ReactNode;
}

export default function ArticleDetailAside({ children }: Readonly<ArticleDetailAsideProps>) {
  return <aside className="sticky top-4 hidden lg:block max-w-xs w-full h-fit space-y-4">{children}</aside>;
}
