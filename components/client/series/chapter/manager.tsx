'use client';

import { changeChapterSequence } from '@/apis/client/series';
import { SeriesChapterActionMenu, SeriesChapterCreateButton } from '@/components/client/series';
import { handleError } from '@/lib/error';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/card';
import ListEmpty from '@ui/list-empty';
import { ListCheckIcon, ListChevronsUpDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface SeriesChapterManagerProps {
  series: SeriesForEdit;
  prefixPath: string;
}

export default function SeriesChapterManager({ series, prefixPath }: Readonly<SeriesChapterManagerProps>) {
  const [chapters, setChapters] = useState(series.chapters);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const queryClient = useQueryClient();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setChapters((prev) => {
        const oldIndex = prev.findIndex((chapter) => chapter.id === active.id);
        const newIndex = prev.findIndex((chapter) => chapter.id === over?.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  function onClickUpdateSequenceButton() {
    const sequences = chapters.map((chapter) => chapter.sequence);
    changeChapterSequence(series.id, sequences)
      .then(async ({ message }) => {
        toast.success(message);
        await queryClient.invalidateQueries({ queryKey: ['getSeriesForEdit', series.id] });
      })
      .catch(handleError);
  }

  useEffect(() => {
    setChapters(series.chapters);
  }, [series.chapters]);

  return (
    <Card className="mx-auto max-w-3xl w-full">
      <CardHeader className="flex items-center justify-between gap-2 pb-4 border-b">
        <div className="space-y-1.5">
          <CardTitle>시리즈 챕터 관리</CardTitle>
          <CardDescription>시리즈 챕터를 관리할 수 있습니다.</CardDescription>
        </div>
        <SeriesChapterCreateButton seriesId={series.id} />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {chapters.length === 0 && <ListEmpty message={'아직 작성된 챕터가 없습니다.'} />}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={chapters} strategy={verticalListSortingStrategy}>
            {chapters.map((chapter, index) => (
              <SeriesChapterManagerItem
                key={chapter.id}
                chapter={chapter}
                seriesId={series.id}
                prefixPath={prefixPath}
              />
            ))}
          </SortableContext>
        </DndContext>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button size={'sm'} onClick={onClickUpdateSequenceButton}>
          <ListCheckIcon /> 순서 저장
        </Button>
      </CardFooter>
    </Card>
  );
}

interface SeriesChapterManagerItemProps {
  chapter: SeriesChapter;
  seriesId: number;
  prefixPath: string;
}

function SeriesChapterManagerItem({ chapter, seriesId, prefixPath }: Readonly<SeriesChapterManagerItemProps>) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} className="px-2 py-2 flex-row items-center gap-1.5">
      <Button type={'button'} variant={'ghost'} size={'icon'} {...listeners}>
        <ListChevronsUpDownIcon />
      </Button>
      <span className="font-bold text-primary">{chapter.sequence}.</span>
      <span className="flex-1 whitespace-normal">{chapter.title}</span>
      <SeriesChapterActionMenu seriesId={seriesId} prefixPath={prefixPath} {...chapter} />
    </Card>
  );
}
