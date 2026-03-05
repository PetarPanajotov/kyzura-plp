import styles from './KyzuraLogo.module.scss';

interface KyzuraLogoProps {
  theme?: 'dark' | 'white';
}

export function KyzuraLogo({ theme = 'dark' }: KyzuraLogoProps) {
    return (
        <div className={`${styles['logo']} ${styles[theme]}`}>
          <span className={styles['logo-text']}>KYZURA</span>
          <span className={styles['logo-accent']}>.</span>
        </div>
    );
}