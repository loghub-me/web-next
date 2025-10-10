'use clinet';

import { removeArticleStar, addArticleStar } from '@/apis/client/article';
import { removeQuestionStar, addQuestionStar } from '@/apis/client/question';
import { removeSeriesStar, addSeriesStar } from '@/apis/client/series';
import { ErrorMessage } from '@/constants/messages';
import { Button } from '@ui/button';
import StarIcon from '@ui/star-icon';
import { useState } from 'react';
import { toast } from 'sonner';

interface StarToggleProps {
  star: UserStar;
}

export default function StarToggle({ star }: Readonly<StarToggleProps>) {
  const [starred, setStarred] = useState(true);
  const [starCount, setStarCount] = useState(star.count);
  const [pending, setPending] = useState(false);
  const { target, targetId } = star;

  function getToggleFn() {
    switch (target) {
      case 'ARTICLE':
        return () => (starred ? removeArticleStar(targetId) : addArticleStar(targetId));
      case 'SERIES':
        return () => (starred ? removeSeriesStar(targetId) : addSeriesStar(targetId));
      case 'QUESTION':
        return () => (starred ? removeQuestionStar(targetId) : addQuestionStar(targetId));
    }
  }

  function onClick() {
    const toggleFn = getToggleFn();
    if (!toggleFn) {
      toast.error(ErrorMessage.UNKNOWN);
      return;
    }
    setPending(true);
    toggleFn()
      .then(() => {
        setStarred((prev) => !prev);
        setStarCount((prev) => (starred ? prev - 1 : prev + 1));
      })
      .finally(() => setPending(false));
  }

  return (
    <Button variant={'outline'} size={'sm'} className="self-center rounded-full" disabled={pending} onClick={onClick}>
      <StarIcon fill={starred} className="size-3.5" /> {starCount}
    </Button>
  );
}
