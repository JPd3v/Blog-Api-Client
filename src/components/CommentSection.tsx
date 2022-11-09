import { useEffect, useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

interface ComponentProps {
  articleId: string;
}

interface IComment {
  _id: string;
  article_id: string;
  name: string;
  comment: string;
  timestamp: Date;
}

export type { IComment };

export default function CommentSection({ articleId }: ComponentProps) {
  const [comments, setComment] = useState<IComment[]>([]);
  const [fetchError, setFetchError] = useState('');
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    async function getComments() {
      try {
        const response = await fetch(
          `https://blog-api-787a.onrender.com/articles/${articleId}/comments`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setComment(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.log(error);
          setFetchError('Failed getting comments from the server');
        }
      } finally {
        setLoading(false);
      }
    }
    getComments();
    return () => {
      controller?.abort();
    };
  }, [newComment]);
  function hadleNewComment() {
    setNewComment((prev) => !prev);
  }

  return (
    <>
      {!fetchError && !loading ? (
        <CommentForm
          articleId={articleId}
          hadleNewComment={() => hadleNewComment()}
        />
      ) : null}
      <div className="article__comments-container">
        {!fetchError && !loading ? (
          comments.map((comment) => (
            <div
              className="comments-container__comment comment"
              key={comment._id}
            >
              <Comment comment={comment} />
            </div>
          ))
        ) : (
          <div>{fetchError}</div>
        )}
        {!fetchError && loading ? <div>Loading comments...</div> : null}
      </div>
    </>
  );
}
