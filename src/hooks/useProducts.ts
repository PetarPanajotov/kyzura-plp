import { useState, useEffect } from "react";
import type { Product } from "@/types/Product";

export function useProducts(category: string | undefined) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(true);
      fetch("/products.json")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const categoryMatch = data.filter(
          (p) => p.category.toLowerCase() === category?.toLowerCase()
        );
        setProducts(categoryMatch);
      })
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setIsLoading(false));
  }, [category]);

  return { products, isLoading };
}