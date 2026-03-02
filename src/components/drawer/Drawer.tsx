import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Drawer.module.scss';

type DrawerSide = 'left' | 'right';

interface DrawerProps {
  isOpen: boolean;
  title?: ReactNode;
  onClose: () => void;
  children: ReactNode;
  side?: DrawerSide;
  width?: string;
}

export default function Drawer({
  isOpen,
  title,
  onClose,
  children,
  side = 'left',
  width = 'min(85vw, 360px)',
}: DrawerProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  const drawerVariants = {
    hidden: {
      x: side === 'left' ? '-100%' : '100%',
    },
    visible: {
      x: 0,
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div ref={rootRef} className={styles['root']}>
          <motion.div
            className={styles['overlay']}
            onClick={onClose}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
          />
          <motion.aside
            className={`${styles['drawer']} ${styles['side']}`}
            role="dialog"
            aria-modal="true"
            style={{ width }}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
          >
            {title != null && (
              <div className={styles['header']}>
                <div className={styles['title']}>{title}</div>
                <button className={styles['close-btn']} type="button" onClick={onClose} aria-label="Close">
                  ✕
                </button>
              </div>
            )}
            <div className={styles['content']}>{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}