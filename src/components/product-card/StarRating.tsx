import { Star, StarHalf } from 'lucide-react';
import styles from './StarRating.module.scss';

interface StarRatingProps {
  rating: number;
  reviewCount: number;
}

export function StarRating({ rating, reviewCount }: StarRatingProps) {
  const renderStars = () => {
    return [...Array(5)].map((_, i) => {
      const starNumber = i + 1;

      // Full Star
      if (rating >= starNumber) {
        return <Star key={i} size={14} className={styles.starFilled} />;
      }

      // Half Star
      if (rating >= starNumber - 0.5) {
        return (
          <div key={i} className={styles.starWrapper}>
            <Star size={14} className={styles.starEmpty} />
            <StarHalf size={14} className={styles.starHalfOverlay} />
          </div>
        );
      }

      // Empty Star
      return <Star key={i} size={14} className={styles.starEmpty} />;
    });
  };

  return (
    <div className={styles.rating}>
      <div className={styles.stars}>{renderStars()}</div>
      <span className={styles.reviewCount}>({reviewCount})</span>
    </div>
  );
}