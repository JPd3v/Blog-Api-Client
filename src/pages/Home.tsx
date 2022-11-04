import { useEffect, useState } from 'react';
import ArticlePreviewCard from '../components/ArticlePreviewCard';

interface Articles {
  author: Author;
  title: string;
  content: string;
  published: boolean;
  published_date: string;
  _id: string;
}
export type { Articles };
interface Author {
  first_name: string;
  last_name: string;
  _id: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Articles[]>([]);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function getArticles() {
      try {
        const response = await fetch(
          'http://localhost:3000/articles?published=true',
          { signal: controller.signal }
        );

        const data = await response.json();
        setArticles(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.log(err);
          setFetchError('failed getting blog articles from the server');
        }
      }
    }
    getArticles();

    return () => {
      controller?.abort();
    };
  }, []);
  return (
    <>
      <div className="home__title"> Latest Blogs Articles </div>
      <div className="article-card-container">
        {!fetchError ? (
          articles.map((article) => (
            <div className="article-card" key={article._id}>
              <ArticlePreviewCard article={article} />
            </div>
          ))
        ) : (
          <div>{fetchError}</div>
        )}
      </div>
    </>
  );
}
