import styles from './NoProducts.module.scss';
import { PackageOpen, RefreshCw } from 'lucide-react';

interface NoProductsProps {
    onClearFilters: () => void;
}

export const NoProducts: React.FC<NoProductsProps> = ({ onClearFilters }) => {
    return (
        <div className={styles['no-products']}>
            <div className={styles['no-products-content']}>
                <div className={styles['icon-wrapper']}>
                    <PackageOpen size={64} strokeWidth={1.5} />
                </div>
                <h3 className={styles['no-products-title']}>
                    No Products Found
                </h3>
                <p className={styles['no-products-description']}>
                    We couldn't find any products matching your current filters.
                    Try adjusting your search criteria or browse our full collection.
                </p>
                <button 
                    className={styles['clear-filters-button']}
                    onClick={onClearFilters}
                >
                    <RefreshCw size={18} />
                    Clear All Filters
                </button>
            </div>
        </div>
    );
};