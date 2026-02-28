import styles from './KyzuraLogo.module.scss';

export function KyzuraLogo() {
    return ( 
        <div className={styles['logo']}>
          <span className={styles['logo-text']}>KYZURA</span>
          <span className={styles['logo-accent']}>.</span>
        </div>
    );
}