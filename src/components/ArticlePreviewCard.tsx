import { Link } from 'react-router-dom';
import type { Articles } from '../pages/Home';

interface ComponentProps {
  article: Articles;
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

// interface ComponentProps {
//   title: string;
//   content: string;
//   authorName: string;
//   authorLastName: string;
//   publishedDate: string;
// }

// export default function ArticlePreviewCard({
//   title,
//   authorName,
//   authorLastName,
//   content,
//   publishedDate,
// }: ComponentProps) {
//   return (
//     <>
//       <p>{title}</p>
//       <p>{`${authorName} ${authorLastName}`}</p>
//       <p>{content}</p>
//       <p>{publishedDate}</p>
//     </>
//   );
// }
