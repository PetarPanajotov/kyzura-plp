import { useMemo, useEffect, useCallback } from "react";
import type { Product } from "@/types/Product";
import type { ActiveFilters } from "@/components/filter/FilterPanel";
import type { SortOption } from "@/components/sort-by/SortBy";

import { useFilters } from "./useFilters";
import { useSort } from "./useSort";
import { usePagination } from "./usePagination";

function applyFilters(products: Product[], filters: ActiveFilters): Product[] {
  return products.filter((product) => {
    // 1. Rating check (AND)
    if (filters.rating && product.rating < filters.rating) return false;

    // 2. Price check (AND)
    if (filters.priceRange) {
      const { price } = product;
      if (filters.priceRange === "under-100" && price >= 100) return false;
      if (filters.priceRange === "100-200" && (price < 100 || price > 200)) return false;
      if (filters.priceRange === "200-300" && (price < 200 || price > 300)) return false;
      if (filters.priceRange === "over-300" && price <= 300) return false;
    }

    // 3. Flags check (OR within the group)
    const activeFlagKeys = (Object.keys(filters.flags) as Array<keyof ActiveFilters['flags']>)
      .filter((key) => filters.flags[key]);

    if (activeFlagKeys.length > 0) {
      const matchesAtLeastOneFlag = activeFlagKeys.some((flagKey) => product[flagKey] === true);
      
      if (!matchesAtLeastOneFlag) {
        return false;
      }
    }

    return true;
  });
}

function applySorting(products: Product[], sortBy: SortOption): Product[] {
  const copy = [...products];
  
  switch (sortBy) {
    case "price-low-high":
      return copy.sort((a, b) => a.price - b.price);
    case "price-high-low":
      return copy.sort((a, b) => b.price - a.price);
    case "name-a-z":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "name-z-a":
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case "featured":
    default:
      return copy;
  }
}

export function useProductCatalog(initialProducts: Product[]) {
  const { activeFilters, updateFilters, clearFilters } = useFilters();
  const { sortBy, changeSort } = useSort();
  const { visibleCount, loadMore, resetPagination } = usePagination();
  useEffect(() => {
    resetPagination();
  }, [activeFilters, sortBy, resetPagination]);

  const resetCatalog = useCallback(() => {
    clearFilters();
    changeSort("featured");
    resetPagination();
  }, [clearFilters, changeSort, resetPagination]);

  const finalDisplayProducts = useMemo(() => {
    const filtered = applyFilters(initialProducts, activeFilters);
    return applySorting(filtered, sortBy);
  }, [initialProducts, activeFilters, sortBy]);

  return {
    activeFilters,
    sortBy,
    visibleCount,
    finalDisplayProducts,
    
    updateFilters,
    clearFilters,
    changeSort,
    loadMore,
    resetCatalog
  };
}