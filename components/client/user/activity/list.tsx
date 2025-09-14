import { CardContent } from '@ui/card';
import React from 'react';

interface UserActivityListProps {
  children?: React.ReactNode;
}

export default function UserActivityList({ children }: Readonly<UserActivityListProps>) {
  return <CardContent className="px-2">{children}</CardContent>;
}
