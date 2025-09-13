interface UserDetailAsideProps {
  children?: React.ReactNode;
}

export default function UserDetailAside({ children }: Readonly<UserDetailAsideProps>) {
  return <aside className="md:max-w-xs w-full h-fit flex flex-col gap-4 items-center">{children}</aside>;
}
