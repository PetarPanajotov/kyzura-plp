
import styles from './BadgeContainer.module.scss';
import { DiscountBadge } from './DiscountBadge';
import { LimitedBadge } from './LimitedBadge';
import { NewArrivalBadge } from './NewArrivalBadge';

interface BadgeContainerProps {
  price: number;
  originalPrice: number | null;
  onSale: boolean;
  limited: boolean;
  newArrival: boolean;
}

export function BadgeContainer({ 
  price, 
  originalPrice, 
  onSale,
  limited,
  newArrival
}: BadgeContainerProps) {
  return (
    <div className={styles['badges']}>
      {onSale && <DiscountBadge price={price} originalPrice={originalPrice} />}
      {newArrival && <NewArrivalBadge />}
      {limited && <LimitedBadge />}
    </div>
  );
}