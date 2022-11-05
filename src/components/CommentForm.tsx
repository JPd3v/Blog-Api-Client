export default function CommentForm() {
  return (
    <form>
      <label htmlFor="name">
        Name:
        <input type="text" name="name" id="name" />
      </label>

      <label htmlFor="comment">
        comment:
        <textarea name="comment" id="comment" />
      </label>
    </form>
  );
}
