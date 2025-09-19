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
import { GlowEffect } from '@ui/glow-effect';
import { BotIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function HomeFeatureAnswerGenerate() {
  return (
    <div className="p-4 flex items-center justify-center w-full h-full border rounded-xl overflow-hidden">
      <Card className="flex-col md:flex-row items-center gap-2 p-4 rounded-xl">
        <h3 className="flex-1 font-medium">AI가 당신의 질문에 답변을 생성해 드립니다!</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={'outline'}
              className="relative overflow-hidden rounded-full border-blue-400/40 dark:border-blue-400/40"
            >
              <GlowEffect color={'bg-blue-400'} />
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
                <Button
                  type="submit"
                  variant={'secondary'}
                  className="border"
                  onClick={() => toast.success('질문 작성 후 요청해주세요!', { icon: <BotIcon className="size-4" /> })}
                >
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
