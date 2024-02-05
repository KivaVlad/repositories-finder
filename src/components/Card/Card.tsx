import { formattedDate } from '../../utils';
import type { IRepoCard } from '../../types/data';
import styles from './Card.module.css';

export const Card: React.FC<IRepoCard> = (props) => {
    const { full_name, description, html_url, created_at, updated_at } = props;

    return (
        <div className={styles.card__container}>
            <div className={styles.up__text_wrapper}>
                <h2 className={styles.card__text}>Name: <span>{full_name}</span></h2>
                <h2 className={styles.card__text}>Description: <span>{description}</span></h2>
                <h2 className={styles.card__text}>Created: <span>{formattedDate(created_at)}</span></h2>
                <h2 className={styles.card__text}>Updated: <span>{formattedDate(updated_at)}</span></h2>
            </div>
            <div className={styles.url__wrapper}>
                <a href={html_url} target='_blank' rel="noreferrer" className={styles.card__link}>{html_url}</a>
            </div>
        </div>
    )
}