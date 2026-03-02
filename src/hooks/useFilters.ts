import { useState } from "react";
import { type ActiveFilters, defaultFilters } from "@/components/filter/FilterPanel";

export function useFilters() {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(defaultFilters);

  const updateFilters = (updates: Partial<ActiveFilters>) => {
    setActiveFilters((prev) => ({ ...prev, ...updates }));
  };

  const clearFilters = () => {
    setActiveFilters(defaultFilters);
  };

  return { activeFilters, updateFilters, clearFilters };
}