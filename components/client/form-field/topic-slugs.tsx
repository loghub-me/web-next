'use client';

import { TopicBadge, TopicIcon } from '@/components/client/topic';
import { ErrorMessage } from '@/constants/messages';
import { searchTopics } from '@/constants/topics';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@ui/command';
import { FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { TagIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { toast } from 'sonner';

interface TopicSlugsFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  topics: Set<Topic>;
  setTopics: React.Dispatch<React.SetStateAction<Set<Topic>>>;
}

export default function TopicSlugsFormField<T extends FieldValues>({
  control,
  topics,
  setTopics,
}: Readonly<TopicSlugsFormFieldProps<T>>) {
  const [query, setQuery] = useState('');
  const [showList, setShowList] = useState(false);

  function onSelect(value: string) {
    const [slug, name] = value.split(':');
    if (topics.has({ slug, name })) {
      toast.error(ErrorMessage.TOPIC_ALREADY_EXISTS);
      return;
    }
    if (topics.size >= 10) {
      toast.error(ErrorMessage.TOPIC_SELECTION_LIMIT);
      return;
    }
    setTopics((prev) => new Set(prev).add({ slug, name }));
    setQuery('');
  }

  function onRemove(topic: Topic) {
    setTopics((prev) => {
      const newSet = new Set(prev);
      newSet.delete(topic);
      return newSet;
    });
  }

  useEffect(() => {
    setShowList(query.trim().length > 0);
  }, [query]);

  return (
    <FormField
      control={control}
      name={'topicSlugs' as Path<T>}
      render={() => (
        <FormItem>
          <FormLabel>토픽</FormLabel>
          <Command className="rounded-md">
            <CommandInput icon={TagIcon} placeholder="토픽을 입력해주세요" value={query} onValueChange={setQuery} />
            <CommandList className={cn(showList ? 'block' : 'hidden')}>
              <CommandEmpty>토픽을 찾을 수 없습니다.</CommandEmpty>
              {searchTopics(query).map((topic) => (
                <CommandItem key={topic.slug} value={`${topic.slug}:${topic.name}`} onSelect={onSelect}>
                  <TopicIcon {...topic} />
                  <span>{topic.name}</span>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
          {topics.size > 0 && (
            <div className="flex gap-1 flex-wrap">
              {[...topics.values()].map((topic) => (
                <TopicBadge key={topic.slug} topic={topic} onClick={() => onRemove(topic)} />
              ))}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
