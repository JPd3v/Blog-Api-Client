import { Link } from 'react-router-dom';
import type { Article } from '../pages/Home';

interface ComponentProps {
  article: Article;
}

export default function ArticlePreviewCard({ article }: ComponentProps) {
  return (
    <>
      <Link
        to={`/user/${article?.author?._id}`}
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

      <p className="article-card__date">{article.published_date}</p>
    </>
  );
}
