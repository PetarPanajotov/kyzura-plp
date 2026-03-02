import Accordion from '../accordion/Accordion';
import { Star } from 'lucide-react';
import styles from './FilterPanel.module.scss';

export interface ActiveFilters {
  priceRange: string | null;
  rating: number | null;
  flags: {
    onSale: boolean;
    limited: boolean;
    newArrival: boolean;
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export const defaultFilters: ActiveFilters = {
  priceRange: null,
  rating: null,
  flags: { onSale: false, limited: false, newArrival: false },
};

interface FilterPanelProps {
  activeFilters: ActiveFilters;
  withLabel?: boolean;
  onUpdateFilters: (updates: Partial<ActiveFilters>) => void;
  onClearFilters: () => void;
  namePrefix: string;
}

const PRICE_OPTIONS = [
  { value: 'under-100', label: 'Under $100' },
  { value: '100-200', label: '$100 - $200' },
  { value: '200-300', label: '$200 - $300' },
  { value: 'over-300', label: 'Over $300' },
] as const;

const RATING_OPTIONS = [5, 4, 3, 2, 1] as const;

const FLAG_OPTIONS = [
  { key: 'onSale', label: 'On Sale' },
  { key: 'limited', label: 'Limited Edition' },
  { key: 'newArrival', label: 'New Arrival' },
] as const;

export default function FilterPanel({ 
  activeFilters,
  withLabel = true,
  onUpdateFilters, 
  onClearFilters, 
  namePrefix 
}: FilterPanelProps) {
  
  const hasActiveFilters =
    activeFilters.priceRange !== null ||
    activeFilters.rating !== null ||
    Object.values(activeFilters.flags).some(Boolean);

  const toggleFlag = (flagKey: keyof ActiveFilters['flags']) => {
    onUpdateFilters({
      flags: {
        ...activeFilters.flags,
        [flagKey]: !activeFilters.flags[flagKey],
      },
    });
  };

  const renderStars = (count: number) => {
    return (
          <div className={styles['stars']}>
        {Array.from({ length: count }, (_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
        </div>
    );
  };

  return (
    <div className={styles['filter']}>
      <div className={styles['filter-top']}>
        {withLabel ? <h5>Filters</h5> : <div></div> }
        {hasActiveFilters && (
          <button 
            className={styles['clear-btn']} 
            onClick={onClearFilters} 
            type="button"
          >
            Clear all
          </button>
        )}
      </div>

      <Accordion title="Price" defaultOpen={true}>
        <div className={styles['price-ranges']}>
          <label className={styles['radio-label']}>
            <input
              type="radio"
              name={`${namePrefix}-price`}
              checked={activeFilters.priceRange === null}
              onChange={() => onUpdateFilters({ priceRange: null })}
            />
            <span>All prices</span>
          </label>

          {PRICE_OPTIONS.map(({ value, label }) => (
            <label key={value} className={styles['radio-label']}>
              <input
                type="radio"
                name={`${namePrefix}-price`}
                checked={activeFilters.priceRange === value}
                onChange={() => onUpdateFilters({ priceRange: value })}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </Accordion>

      <Accordion title="Rating" defaultOpen={true}>
        <div className={styles['ratings']}>
          <label className={styles['radio-label']}>
            <input
              type="radio"
              name={`${namePrefix}-rating`}
              checked={activeFilters.rating === null}
              onChange={() => onUpdateFilters({ rating: null })}
            />
            <span>All ratings</span>
          </label>

          {RATING_OPTIONS.map((rating) => (
            <label key={rating} className={styles['radio-label']}>
              <input
                type="radio"
                name={`${namePrefix}-rating`}
                checked={activeFilters.rating === rating}
                onChange={() => onUpdateFilters({ rating })}
              />
              <span className={styles['ratings']}>
                {renderStars(rating)}
              </span>
            </label>
          ))}
        </div>
      </Accordion>

      <Accordion title="Special" defaultOpen={true}>
        <div className={styles['flags']}>
          {FLAG_OPTIONS.map(({ key, label }) => (
            <label key={key} className={styles['checkbox-label']}>
              <input
                type="checkbox"
                checked={activeFilters.flags[key]}
                onChange={() => toggleFlag(key)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </Accordion>
    </div>
  );
}