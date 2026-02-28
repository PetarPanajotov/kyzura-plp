import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { KyzuraLogo } from '../kyzura-logo/KyzuraLogo';

export default function Header() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/bags" className="logo">
          <KyzuraLogo />
        </Link>
        <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <ul className="nav-menu">
            <li>
              <NavLink 
                to="/bags" 
                className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-item-text">Bags</span>
                <span className="nav-item-line"></span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/shoes" 
                className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-item-text">Shoes</span>
                <span className="nav-item-line"></span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <div className={`search-container ${isSearchOpen ? 'is-open' : ''}`}>
            <button 
              className="icon-button search-toggle"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>
            <div className="search-dropdown">
              <input 
                type="text" 
                placeholder="Search products..."
                className="search-input"
                autoFocus
              />
            </div>
          </div>
          <button className="icon-button cart-button" aria-label="Shopping cart">
            <ShoppingCart size={20} />
            <span className="cart-badge">2</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}