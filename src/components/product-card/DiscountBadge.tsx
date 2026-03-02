import styles from './DiscountBadge.module.scss';

interface DiscountBadgeProps {
  price: number;
  originalPrice: number | null;
}

export function DiscountBadge({ price, originalPrice }: DiscountBadgeProps) {
  if (!originalPrice || originalPrice <= price) return null;

  const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

  return <span className={styles['badge']}>-{discountPercent}%</span>;
}