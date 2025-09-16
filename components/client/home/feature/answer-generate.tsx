'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { BotIcon, EllipsisIcon } from 'lucide-react';

export default function HomeFeatureAnswerGenerate() {
  return (
    <div className="p-4 flex items-center justify-center w-full h-full border rounded-xl overflow-hidden">
      <Card className="flex-row items-center gap-2 p-4 rounded-xl">
        <h3 className="flex-1 font-medium">AI가 작성한 답변을 통해 궁금증을 해결해보세요!</h3>
        <Button variant={'ghost'} size={'icon'} className="rounded-full" disabled>
          <EllipsisIcon />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'outline'} size={'sm'} className="rounded-full">
              <BotIcon className="text-blue-400" /> 답변 생성
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>AI 답변 생성 요청</DialogTitle>
              <DialogDescription>답변 생성은 10분에 한 번만 요청할 수 있습니다.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogCloseButton>취소하기</DialogCloseButton>
              <DialogClose asChild>
                <Button type="submit" variant={'secondary'} className="border">
                  <BotIcon className="text-blue-400" /> 요청하기
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}
