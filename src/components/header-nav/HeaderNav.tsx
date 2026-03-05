import { NAV_LINKS } from '@/utils/constants';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './HeaderNav.module.scss';

interface HeaderNavProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

export function HeaderNav({ isMenuOpen, closeMenu }: HeaderNavProps) {
  const [isResizing, setIsResizing] = useState(false);

 useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;
    
    const handleResize = () => {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => setIsResizing(false), 300);


      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [closeMenu]);

  return (
    <nav 
      className={`
        ${styles['main-nav']} 
        ${isMenuOpen ? styles['is-open'] : ''} 
        ${isResizing ? styles['is-resizing'] : ''}
      `.trim()}
    >
      <ul className={styles['nav-menu']}>
        {NAV_LINKS.map((link) => (
          <li key={link.path}>
            <NavLink 
              to={link.path} 
              className={({ isActive }) => 
                isActive ? `${styles['nav-item']} ${styles['active']}` : styles['nav-item']
              }
              onClick={closeMenu}
            >
              <span className={styles['nav-item-text']}>{link.label}</span>
              <span className={styles['nav-item-line']}></span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}