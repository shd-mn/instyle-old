import { Link } from 'react-router-dom';
import styles from './NewsSection.module.scss';
import { useFetch } from '../../hooks/useFetch';
const NewsSection = () => {
    const { data: news, isLoading, error } = useFetch('news', '*', '', '0-2');
    return (
        <section className={styles['news-section']}>
            <div className="container">
                <div className="category-nav">
                    <h2 className="h2">Latest News</h2>
                    <Link className="link" to="/news">
                        View All
                    </Link>
                </div>
                <div className={styles.news}>
                    {news.map((item) => (
                        <article key={item.id} className={styles['news-item']}>
                            <figure className={styles.figure}>
                                <img src={item.img[0]} alt={item.title} />
                            </figure>
                            <h5>{item.category}</h5>
                            <h3>{item.title}</h3>
                            <Link className="link" to={`/news/${item.id}`}>
                                Read More
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
