import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.scss';

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.accordion}>
      <button 
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown 
          size={18} 
          className={`${styles.icon} ${isOpen ? styles.open : ''}`}
        />
      </button>
      <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
        <div className={styles.inner}>
          {children}
        </div>
      </div>
    </div>
  );
}