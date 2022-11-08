import { useState } from 'react';

interface ComponentProps {
  articleId: string;
}

export default function CommentForm({ articleId }: ComponentProps) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formResponse, setFormResponse] = useState('');

  async function formHandler(e: React.SyntheticEvent) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const req = await fetch(
        `https://blog-api-787a.onrender.com/articles/${articleId}/comments`,
        {
          method: 'POST',
          mode: 'cors',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ name, comment }),
        }
      );

      if (req.status === 200) {
        setFormResponse('your comment was submitted successfully');
        setIsSubmitting(false);
        setName('');
        setComment('');
      } else {
        setFormResponse('Something went wrong, please try again later');
      }
    } catch (error) {
      console.log(error);
      setFormResponse('Something went wrong, please try again later');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleNameChange(e: React.SyntheticEvent) {
    setName((e.target as HTMLInputElement).value);
  }
  function handleCommentChange(e: React.SyntheticEvent) {
    setComment((e.target as HTMLInputElement).value);
  }

  return (
    <form className="article__comment-form comment-form" onSubmit={formHandler}>
      <p className="comment-form__text">leave a comment </p>
      <label htmlFor="name" className="comment-form__label">
        Name:
        <input
          type="text"
          name="name"
          id="name"
          className="comment-form__input"
          onChange={handleNameChange}
          value={name}
          required
        />
      </label>

      <label htmlFor="comment" className="comment-form__label">
        Comment:
        <textarea
          name="comment"
          id="comment"
          className="comment-form__input"
          onChange={handleCommentChange}
          value={comment}
          required
        />
      </label>

      <button
        type="submit"
        className="comment-form__submit-button"
        disabled={isSubmitting}
      >
        submit comment
      </button>
      {isSubmitting ? <p>Loading...</p> : null}
      {formResponse && !isSubmitting ? <p>{formResponse}</p> : null}
    </form>
  );
}
