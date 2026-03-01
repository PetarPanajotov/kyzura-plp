import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { KyzuraLogo } from '../kyzura-logo/KyzuraLogo';
import styles from './Header.module.scss';
import { HeaderNav } from '../header-nav/HeaderNav';

export default function Header() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
          <div className={`search-container ${isSearchOpen ? styles['is-open'] : ''}`}>
            <button 
              className={styles['icon-button'] + ' ' + styles['search-toggle']}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>
            <div className={styles['search-dropdown']}>
              <input 
                type="text" 
                placeholder="Search products..."
                className={styles['search-input']}
                autoFocus
              />
            </div>
          </div>
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