import { useState } from "react";
import type { SortOption } from "@/components/sort-by/SortBy";

export function useSort(defaultSort: SortOption = "featured") {
  const [sortBy, setSortBy] = useState<SortOption>(defaultSort);

  const changeSort = (newSort: SortOption) => {
    setSortBy(newSort);
  };

  return { sortBy, changeSort };
}