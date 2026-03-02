import { memo, useState } from 'react';
import { StarRating } from './StarRating';
import { DiscountBadge } from './DiscountBadge';
import { ProductPrice } from './ProductPrice';
import styles from './ProductCard.module.scss';
import type { Product } from '@/types/Product';
import { AddToCartMessage } from './AddToCartMessage';

/** We use here memo, as we don't want to rerender on every sort/filter. With this approach I improved the INP with ~80% */
const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  const { name, description, price, originalPrice, rating, reviewCount, image } = product;
  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = () => {
    setShowMessage(true);
  };

  return (
    <div className={styles['card']}>
      <div className={styles['image-container']}>
        <img src={image} alt={name} loading="lazy" className={styles['image']} />
        <DiscountBadge price={price} originalPrice={originalPrice} />
      </div>

      <div className={styles['info']}>
        <StarRating rating={rating} reviewCount={reviewCount} />

        <h5 className={styles['name']} title={name}>{name}</h5>
        <p className={styles['description']}>{description}</p>

        <ProductPrice price={price} originalPrice={originalPrice} />

        <AddToCartMessage 
          isVisible={showMessage} 
          productName={name} 
          onClose={() => setShowMessage(false)} 
        />

        <button 
          className={styles['add-to-cart-button']} 
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
});

export default ProductCard;