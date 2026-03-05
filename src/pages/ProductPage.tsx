import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import CategoryHeader from "@/components/category-header/CategoryHeader";
import ProductCard from "@/components/product-card/ProductCard";
import SortBy from "@/components/sort-by/SortBy";
import Filter, { type FilterHandle } from "@/components/filter/Filter";
import { useProducts } from "@/hooks/useProducts";
import { useProductCatalog } from "@/hooks/useProductCatalog";

import styles from "./ProductPage.module.scss";
import { NoProducts } from "@/components/no-products/NoProducts";
import { NAV_LINKS } from "@/utils/constants";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { X } from "lucide-react";

export function ProductPage() {
  const { category } = useParams<{ category: string }>();
  const filterRef = useRef<FilterHandle>(null);

  const { products } = useProducts(category);

  const {
    activeFilters,
    sortBy,
    visibleCount,
    finalDisplayProducts,
    updateFilters,
    clearFilters,
    changeSort,
    loadMore,
    resetCatalog
  } = useProductCatalog(products);

  useEffect(() => {
    filterRef.current?.close();

    resetCatalog();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [category]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeFilters.priceRange) count++;
    if (activeFilters.rating) count++;

    const activeFlags = Object.values(activeFilters.flags).filter(Boolean).length;
    count += activeFlags;

    return count;
  }, [activeFilters]);

  const currentCategory = useMemo(() => {
    return NAV_LINKS.find((link) => link.slug === category);
  }, [category]);

  const pageTitle = currentCategory ? `Kyzura: ${currentCategory.label}` : 'Kyzura';

  useDocumentTitle(pageTitle);

  const visibleProducts = finalDisplayProducts.slice(0, visibleCount);
  const showingCount = visibleProducts.length;
  const totalCount = finalDisplayProducts.length;
  const hasProducts = totalCount > 0;
  const canLoadMore = visibleCount < totalCount;

  return (
    <div className={styles["page-wrapper"]}>
      <aside className={styles["filter-sidebar"]}>
        <Filter
          ref={filterRef}
          activeFilters={activeFilters}
          onUpdateFilters={updateFilters}
          onClearFilters={clearFilters}
        />
      </aside>

      <main className={styles["main-content"]}>
        <header className={styles["header"]}>
          <CategoryHeader slug={category!} />

          <div className={styles["header-actions"]}>
            <div className={styles["filter-controls"]}>
              <button
                className={styles["filter-trigger"]}
                type="button"
                onClick={() => filterRef.current?.open()}
              >
                Filters
                {activeFilterCount > 0 && (
                  <span className={styles["filter-badge"]}>{activeFilterCount}</span>
                )}
              </button>

              {activeFilterCount > 0 && (
                <button
                  className={styles["filter-clear-quick"]}
                  onClick={clearFilters}
                  aria-label="Clear all filters"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <SortBy
              currentSort={sortBy}
              onSortChange={changeSort}
            />
          </div>
        </header>

        <section className={styles["product-grid"]}>
          {hasProducts && (
            visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </section>

        {!hasProducts && <NoProducts onClearFilters={clearFilters} />}

        {hasProducts && (
          <>
            <p className={styles["pagination"]}>
              Showing <strong>{showingCount}</strong> of <strong>{totalCount}</strong> products
            </p>

            {canLoadMore && (
              <div className={styles["load-more-container"]}>
                <button
                  className={styles["load-more-button"]}
                  onClick={loadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}