import { useEffect, useState } from 'react';
import ArticlePreviewCard from '../components/ArticlePreviewCard';
import LoadingPage from '../utils/LoadingPage';

interface Article {
  author: Author;
  title: string;
  content: string;
  published: boolean;
  published_date: string;
  _id: string;
}
export type { Article };
interface Author {
  first_name: string;
  last_name: string;
  _id: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [fetchError, setFetchError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function getArticles() {
      try {
        const response = await fetch(
          'https://blog-api-787a.onrender.com/articles?published=true',
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
      <div className="home__title"> Latest Blogs Articles </div>
      <div className="article-card-container">
        {!fetchError ? (
          articles.map((article) => (
            <div className="article-card" key={article._id}>
              <ArticlePreviewCard article={article} />
            </div>
          ))
        ) : (
          <div className="articles-fetch-error">{fetchError}</div>
        )}
      </div>
      {loading && !fetchError ? <LoadingPage /> : null}
    </div>
  );
}
