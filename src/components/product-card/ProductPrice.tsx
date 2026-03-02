import styles from './ProductPrice.module.scss';

interface ProductPriceProps {
  price: number;
  originalPrice: number | null;
}

export function ProductPrice({ price, originalPrice }: ProductPriceProps) {
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className={styles['price-container']}>
      <span className={styles['price']}>${price}</span>
      {hasDiscount && <span className={styles['original-price']}>${originalPrice}</span>}
    </div>
  );
}