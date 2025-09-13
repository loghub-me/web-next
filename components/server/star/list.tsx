interface StarListProps {
  children?: React.ReactNode;
  hasAside?: boolean;
}

export default function StarList({ children, hasAside = false }: Readonly<StarListProps>) {
  return <div className="border rounded-xl shadow-xs overflow-hidden">{children}</div>;
}
