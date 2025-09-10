'use client';

import { Button } from '@ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PageStateNavProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export default function PageStateNav({ currentPage, setCurrentPage, totalPages }: Readonly<PageStateNavProps>) {
  const maxPagesToShow = 5;
  const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  function renderPrevButton() {
    return (
      <Button
        variant={'ghost'}
        size={'icon'}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        <ChevronLeftIcon />
      </Button>
    );
  }

  function renderNextButton() {
    return (
      <Button
        variant={'ghost'}
        size={'icon'}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        <ChevronRightIcon />
      </Button>
    );
  }

  function renderPageButton(page: number) {
    return (
      <Button
        key={page}
        variant={currentPage === page ? 'secondary' : 'ghost'}
        size={'icon'}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </Button>
    );
  }

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-1">
      {currentPage > 1 && renderPrevButton()}
      {pages.map((page) => renderPageButton(page))}
      {currentPage < totalPages && renderNextButton()}
    </div>
  );
}
