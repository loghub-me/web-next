'use client';

import { TopicBadge, TopicIcon } from '@/components/client/topic';
import { ErrorMessage } from '@/constants/messages';
import { getTopicSetBySlugs, searchTopics } from '@/constants/topics';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@ui/command';
import { FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { TagIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { toast } from 'sonner';

interface TopicSlugsFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  topicSlugs: Set<string>;
  setTopicSlugs: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export default function TopicSlugsFormField<T extends FieldValues>({
  control,
  topicSlugs,
  setTopicSlugs,
}: Readonly<TopicSlugsFormFieldProps<T>>) {
  const [query, setQuery] = useState('');
  const [showList, setShowList] = useState(false);

  function onSelect(value: string) {
    const [slug] = value.split(':');
    if (topicSlugs.has(slug)) {
      toast.error(ErrorMessage.TOPIC_ALREADY_EXISTS);
      return;
    }
    if (topicSlugs.size >= 10) {
      toast.error(ErrorMessage.TOPIC_SELECTION_LIMIT);
      return;
    }

    setTopicSlugs((prev) => {
      const newSet = new Set(prev);
      newSet.add(slug);
      return newSet;
    });
    setQuery('');
  }

  function onRemove(topicSlug: string) {
    setTopicSlugs((prev) => {
      const newSet = new Set(prev);
      newSet.delete(topicSlug);
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
          {topicSlugs.size > 0 && (
            <div className="flex gap-1 flex-wrap">
              {getTopicSetBySlugs(topicSlugs).map((topic) => (
                <TopicBadge key={topic.slug} topic={topic} onClick={() => onRemove(topic.slug)} />
              ))}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
