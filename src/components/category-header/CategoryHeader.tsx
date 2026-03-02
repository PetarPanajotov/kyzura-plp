import { NAV_LINKS } from '@/utils/constants';
import styles from './CategoryHeader.module.scss';

export interface CategoryHeaderProps {
  slug: string
}

export default function CategoryHeader({slug}: CategoryHeaderProps) {

  const category = NAV_LINKS.find((link) => link.slug === slug);

  if (!category) {
    throw new Error("Category doesn't exist.") 
  }

  return (
    <div>
      <h3 className={styles.title}>{category.label}</h3>
      <p className={styles.description}>{category.description}</p>
    </div>
  );
}
