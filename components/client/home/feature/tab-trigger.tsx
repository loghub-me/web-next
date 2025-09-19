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
    <TabsTrigger value={value} className="flex gap-3">
      <span className="flex items-center justify-center size-8 bg-accent border rounded-md">
        <Icon className="size-4" />
      </span>
      <div className="flex-1 text-left">
        <h5 className="font-semibold">{title}</h5>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </TabsTrigger>
  );
}
