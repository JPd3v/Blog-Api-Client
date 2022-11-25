import { Link } from 'react-router-dom';
import type { Article } from '../pages/Home';

interface ComponentProps {
  article: Article;
}

export default function ArticlePreviewCard({ article }: ComponentProps) {
  const formatedDate = new Date(article.published_date).toLocaleDateString(
    'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <>
      <Link
        to={`/author/${article?.author?._id}`}
        className="article-card__author"
      >
        {`${article?.author?.first_name} ${article?.author?.last_name}`}
      </Link>
      <Link to={`/article/${article._id}`} className="article-card__title">
        {article.title}
      </Link>
      <Link to={`/article/${article._id}`} className="article-card__content">
        {article.content}
      </Link>

      <p className="article-card__date">{formatedDate}</p>
    </>
  );
}
