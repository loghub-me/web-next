import { TabsTrigger } from '@ui/tabs';
import { LucideIcon } from 'lucide-react';

export default function FeatureTabsTrigger({
  value,
  title,
  description,
  icon: Icon,
}: Readonly<{
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
}>) {
  return (
    <TabsTrigger value={value}>
      <span className="size-8 text-accent-foreground bg-accent border rounded-md">
        <Icon className="m-2 size-4" />
      </span>
      <div className="text-left">
        <h5 className="font-semibold">{title}</h5>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </TabsTrigger>
  );
}
