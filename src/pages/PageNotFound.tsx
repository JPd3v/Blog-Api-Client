import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div>
      <div>404 Page Not found </div>
      <Link to="/">Back to home </Link>
    </div>
  );
}
