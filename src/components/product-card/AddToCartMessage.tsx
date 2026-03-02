import { useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import styles from './AddToCartMessage.module.scss';

interface AddToCartMessageProps {
  isVisible: boolean;
  productName: string;
  onClose: () => void;
}

export const AddToCartMessage = memo(function AddToCartMessage({ 
  isVisible, 
  productName, 
  onClose 
}: AddToCartMessageProps) {
  
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  if (!isVisible) return null;
  
  return createPortal(
    <div className={styles['cart-message-fixed']}>
      {productName} added to cart!
    </div>,
    document.body
  )
});