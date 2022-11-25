import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticlePreviewCard from '../components/ArticlePreviewCard';
import LoadingPage from '../utils/LoadingPage';
import { Article } from './Home';
import PageNotFound from './PageNotFound';

export default function AuthorPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [fetchError, setFetchError] = useState('');
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const controller = new AbortController();

    async function getArticles() {
      try {
        const response = await fetch(
          `https://blog-api-787a.onrender.com/articles?published=true&author=${params.id}`,
          { signal: controller.signal }
        );

        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.log(err);
          setLoading(false);
          setFetchError('Failed getting blog articles from the server.');
        }
      }
    }
    getArticles();

    return () => {
      controller?.abort();
    };
  }, []);
  return (
    <div className="home">
      <div className="home__title">
        {articles[0] ? (
          <p>
            Latest
            <span className="title__author-name">
              {` ${articles[0]?.author.first_name} ${articles[0]?.author.last_name}`}{' '}
            </span>
            Blogs Articles
          </p>
        ) : null}
      </div>
      <div className="article-card-container">
        {!fetchError
          ? articles.map((article: Article) => (
              <div className="article-card" key={article._id}>
                <ArticlePreviewCard article={article} />
              </div>
            ))
          : null}
      </div>
      {loading && !fetchError ? <LoadingPage /> : null}
      {!loading && !articles.length ? <PageNotFound /> : null}
    </div>
  );
}
