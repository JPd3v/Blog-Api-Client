import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="page-not-found-error">
      <div>404 Page Not found </div>
      <Link to="/">Back to home </Link>
    </div>
  );
}
