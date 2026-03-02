import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './SortBy.module.scss';

export type SortOption =
  | 'featured'
  | 'price-low-high'
  | 'price-high-low'
  | 'name-a-z'
  | 'name-z-a'

interface SortByProps {
  onSortChange: (sortValue: SortOption) => void;
  currentSort: SortOption;
}

interface SortOptionItem {
  value: SortOption;
  label: string;
}

const sortOptions: SortOptionItem[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'name-a-z', label: 'Name: A-Z' },
  { value: 'name-z-a', label: 'Name: Z-A' },
];

export default function SortBy({ onSortChange, currentSort }: SortByProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label;

  const handleSelect = (value: SortOption) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.sortBy}>
      <label className={styles.label}>Sort by:</label>
      <div className={styles.dropdown}>
        <button
          className={styles.trigger}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{currentLabel}</span>
          <ChevronDown
            size={16}
            className={`${styles.icon} ${isOpen ? styles.open : ''}`}
          />
        </button>

        {isOpen && (
          <>
            <div
              className={styles.overlay}
              onClick={() => setIsOpen(false)}
            />
            <div className={styles.menu}>
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  className={`${styles.option} ${currentSort === option.value ? styles.active : ''}`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                  {currentSort === option.value && (
                    <span className={styles.check}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}