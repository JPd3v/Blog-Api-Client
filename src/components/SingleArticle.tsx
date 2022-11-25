import { Link } from 'react-router-dom';
import type { Article } from '../pages/Home';

interface ComponentProps {
  article: Article;
}

export default function SingleArticle({ article }: ComponentProps) {
  const formatedDate = new Date(article.published_date).toLocaleDateString(
    'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );
  return (
    <div className="article-content">
      <Link
        to={`/author/${article.author._id} `}
        className="article-content__author"
      >
        {`${article.author.first_name} ${article.author.last_name}`}
      </Link>
      <p className="article-content__date">{formatedDate}</p>
      <p className="article-content__title">{article.title}</p>
      <p className="article-content__content">{article.content}</p>
    </div>
  );
}
