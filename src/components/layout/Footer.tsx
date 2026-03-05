import { Facebook, Instagram, Mail, Twitter } from 'lucide-react';
import styles from './Footer.module.scss';
import { KyzuraLogo } from '../kyzura-logo/KyzuraLogo';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '@/utils/constants';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles['footer-inner']}>
                <div className={styles['footer-main']}>
                    <div className={styles['footer-brand']}>
                        <KyzuraLogo theme='white' />
                        <p className={styles['brand-description']}>
                            Premium bags and accessories for the modern lifestyle.
                            Quality craftsmanship meets contemporary design.
                        </p>
                        <div className={styles['social-links']}>
                            <a href="javascript:void(0)" className={styles['social-link']} aria-label="Facebook">
                                <Facebook size={18} />
                            </a>
                            <a href="javascript:void(0)" className={styles['social-link']} aria-label="Instagram">
                                <Instagram size={18} />
                            </a>
                            <a href="javascript:void(0)" className={styles['social-link']} aria-label="Twitter">
                                <Twitter size={18} />
                            </a>
                            <a href="javascript:void(0)" className={styles['social-link']} aria-label="Email">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    <div className={styles['footer-column']}>
                        <h4 className={styles['column-title']}>Shop</h4>
                        <ul className={styles['column-links']}>
                            {NAV_LINKS.map((link) => (
                                <li key={link.slug}>
                                    <Link to={link.path}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles['footer-column']}>
                        <h4 className={styles['column-title']}>Customer Service</h4>
                        <ul className={styles['column-links']}>
                            <li><a href="javascript:void(0)">Contact Us</a></li>
                            <li><a href="javascript:void(0)">Shipping & Delivery</a></li>
                            <li><a href="javascript:void(0)">Returns & Exchanges</a></li>
                            <li><a href="javascript:void(0)">FAQ</a></li>
                            <li><a href="javascript:void(0)">Size Guide</a></li>
                        </ul>
                    </div>

                    <div className={styles['footer-column']}>
                        <h4 className={styles['column-title']}>Company</h4>
                        <ul className={styles['column-links']}>
                            <li><a href="javascript:void(0)">About Us</a></li>
                            <li><a href="javascript:void(0)">Careers</a></li>
                            <li><a href="javascript:void(0)">Sustainability</a></li>
                            <li><a href="javascript:void(0)">Press</a></li>
                            <li><a href="javascript:void(0)">Store Locator</a></li>
                        </ul>
                    </div>

                    <div className={styles['footer-column']}>
                        <h4 className={styles['column-title']}>Stay Connected</h4>
                        <p className={styles['newsletter-text']}>
                            Subscribe to get special offers and updates
                        </p>
                        <form className={styles['newsletter-form']}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={styles['newsletter-input']}
                                aria-label="Email address"
                            />
                            <button type="reset" className={styles['newsletter-button']}>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className={styles['footer-bottom']}>
                    <div className={styles['footer-legal']}>
                        <a href="javascript:void(0)" className={styles['legal-link']}>Terms & Conditions</a>
                        <span className={styles['legal-separator']}>•</span>
                        <a href="javascript:void(0)" className={styles['legal-link']}>Privacy Policy</a>
                        <span className={styles['legal-separator']}>•</span>
                        <a href="javascript:void(0)" className={styles['legal-link']}>Cookie Policy</a>
                    </div>
                    <div className={styles['footer-copyright']}>
                        © 2024 KYZURA. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}