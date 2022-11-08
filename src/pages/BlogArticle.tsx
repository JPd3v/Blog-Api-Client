import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import CommentSection from '../components/CommentSection';
import SingleArticle from '../components/SingleArticle';
import LoadingPage from '../utils/LoadingPage';
import type { Article } from './Home';

const initialArticle = {
  author: { first_name: '', last_name: '', _id: '' },
  title: '',
  content: '',
  published: true,
  published_date: '',
  _id: '',
};

export default function BlogArticle() {
  const [article, setArticle] = useState<Article>(initialArticle);
  const [fetchError, setFetchError] = useState('');
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const controller = new AbortController();
    async function getArticle() {
      try {
        const response = await fetch(
          `https://blog-api-787a.onrender.com/articles/${params.id}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setArticle(data);
        setLoading(false);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.log(err);
          setLoading(false);
          setFetchError(
            'Failed getting blog article Information from the server.'
          );
        }
      }
    }
    getArticle();
    return () => {
      controller?.abort();
    };
  }, []);
  return (
    <div className="article">
      {!fetchError && !loading ? (
        <>
          <SingleArticle article={article} />
          <CommentForm articleId={article._id} />
          <CommentSection />
        </>
      ) : (
        <div>{fetchError}</div>
      )}
      {!fetchError && loading ? <LoadingPage /> : null}
    </div>
  );
}
