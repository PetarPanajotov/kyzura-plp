import { useState, useCallback } from "react";

export function usePagination(initialCount: number = 20, step: number = 20) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + step);
  }, [step]);

  const resetPagination = useCallback(() => {
    setVisibleCount(initialCount);
  }, [initialCount]);

  return { visibleCount, loadMore, resetPagination };
}