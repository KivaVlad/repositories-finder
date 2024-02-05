import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchRepositories, resetResults } from '../../store/slice/repoSlice';
import { transformWords } from '../../utils';
import { Card } from '../Card/Card';
import type { IRepoCard, ISearchData } from '../../types/data';

import styles from './Main.module.css';
import loopImg from '../../assets/icons/icon-search.svg';

export const Main: React.FC = () => {
    const { loading, error, items, total_count } = useAppSelector((state) => state.repositories);
    const [reponame, setReponame] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const totalWords = ['результат', 'результата', 'результатов'];
    const dispatch = useAppDispatch();

    const data: ISearchData = {
        name: reponame,
        page: currentPage,
    }

    function reset() {
        setCurrentPage(0);
        dispatch(resetResults());
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (reponame.trim()) {
            reset();
            dispatch(fetchRepositories(data));
        }
    }

    useEffect(() => {
        if (error) return

        function handleScroll() {
            if (total_count > items.length) {
                const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

                if (bottom) {
                    setCurrentPage(currentPage + 1);
                    dispatch(fetchRepositories(data));
                }
            }
        }

        window.addEventListener('scroll', handleScroll);
        return function() {
            window.removeEventListener('scroll', handleScroll);
        }
    })

    return (
        <main className={styles.main}>

            <div className={styles.form__wrapper}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.input__container}>
                        <img src={loopImg} alt='' />

                        <input 
                            type='text'
                            autoComplete='off'
                            className={styles.input}
                            placeholder="Search GitHub repositories"
                            value={reponame}
                            onChange={(e) => setReponame(e.target.value)}
                        />
                    </div>

                    {error && 
                        <div className={styles.error__wrapper}>No results</div>
                    }

                    <button 
                        type='submit' 
                        disabled={loading}
                        className={styles.button}
                    >
                        Search
                    </button>
                </form>
            </div>

            {items.length > 0 &&
                <div className={styles.results__wrapper}>
                    <h2 className={styles.title}>Найдено {transformWords(total_count, totalWords)}</h2>

                    <div className={styles.result__cards}>
                        {items.map((item: IRepoCard, index: number) => <Card key={index} {...item} />)}
                    </div>

                    <div className={styles.loader__wrapper}>
                        {loading && <span>loading ...</span>}
                    </div>
                </div>
            }
        </main>
    )
}