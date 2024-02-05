import styles from './Header.module.css';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h2>repositories finder</h2>
            </div>
        </header>
    )
}