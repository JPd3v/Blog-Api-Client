import { Link } from 'react-router-dom';
import type { Article } from '../pages/Home';

interface ComponentProps {
  article: Article;
}

export default function SingleArticle({ article }: ComponentProps) {
  return (
    <div className="article-content">
      <Link
        to={`/user/${article.author._id} `}
        className="article-content__author"
      >
        {`${article.author.first_name} ${article.author.last_name}`}
      </Link>
      <p className="article-content__date">{article.published_date}</p>
      <p className="article-content__title">{article.title}</p>
      <p className="article-content__content">{article.content}</p>
    </div>
  );
}
