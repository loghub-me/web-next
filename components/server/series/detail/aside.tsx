interface SeriesDetailAsideProps {
  children?: React.ReactNode;
}

export default function SeriesDetailAside({ children }: Readonly<SeriesDetailAsideProps>) {
  return <aside className="md:max-w-xs w-full h-fit space-y-4">{children}</aside>;
}
