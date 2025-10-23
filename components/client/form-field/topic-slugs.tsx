'use client';

import { TopicBadge, TopicIcon } from '@/components/client/topic';
import { ErrorMessage } from '@/constants/messages';
import { getTopicSetBySlugs, searchTopics } from '@/constants/topics';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@ui/command';
import { FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { SearchIcon, TagIcon } from 'lucide-react';
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
  const debouncedQuery = useDebouncedValue(query, 200);

  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);

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
    const hasInput = query.trim().length > 0;
    setShowList(hasInput);
    if (!hasInput) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setTopics([]);
  }, [query]);

  useEffect(() => {
    const resolvedQuery = debouncedQuery.trim();
    if (resolvedQuery.length === 0) {
      setLoading(false);
      setTopics([]);
      return;
    }

    let cancelled = false;

    const tick = setTimeout(() => {
      Promise.resolve(searchTopics(resolvedQuery))
        .then((data) => {
          if (cancelled) return;
          setTopics(data);
        })
        .catch(() => {
          if (cancelled) return;
          setTopics([]);
        })
        .finally(() => {
          if (cancelled) return;
          setLoading(false);
        });
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(tick);
    };
  }, [debouncedQuery]);

  return (
    <FormField
      control={control}
      name={'topicSlugs' as Path<T>}
      render={() => (
        <FormItem>
          <FormLabel>토픽</FormLabel>
          <Command className="relative border overflow-visible">
            <CommandInput icon={TagIcon} value={query} onValueChange={setQuery} placeholder="토픽을 입력해주세요" />
            <CommandList
              className={cn(
                'absolute top-11 z-10 p-1 w-full max-h-48 bg-card border rounded-md',
                showList ? 'block' : 'hidden'
              )}
            >
              {loading ? (
                <CommandEmpty icon={SearchIcon}>검색 중...</CommandEmpty>
              ) : (
                <>
                  <CommandEmpty>토픽을 찾을 수 없습니다.</CommandEmpty>
                  {topics?.map((topic) => (
                    <CommandItem
                      key={topic.slug}
                      value={`${topic.slug}:${topic.name}`}
                      onSelect={onSelect}
                      className="my-0.5 first:mt-0 last:mb-0"
                    >
                      <TopicIcon {...topic} />
                      <span>{topic.name}</span>
                    </CommandItem>
                  ))}
                </>
              )}
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
