import { Menu, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeaderNav } from '../header-nav/HeaderNav';
import { KyzuraLogo } from '../kyzura-logo/KyzuraLogo';
import styles from './Header.module.scss';

export default function Header() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles['header']}>
      <div className={styles['header-container']}>
        <button 
          className={styles['mobile-menu-toggle']}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/bags" className="logo">
          <KyzuraLogo />
        </Link>
        <HeaderNav isMenuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
        <div className={styles['header-actions']}>
          <button className={styles['icon-button'] + ' ' + styles['cart-button']} aria-label="Shopping cart">
            <ShoppingCart size={20} />
            <span className={styles['cart-badge']}>2</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div 
          className={styles['mobile-overlay']}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}