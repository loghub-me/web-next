interface StarListProps {
  children?: React.ReactNode;
}

export default function StarList({ children }: Readonly<StarListProps>) {
  return <div className="border rounded-xl shadow-xs overflow-hidden">{children}</div>;
}
