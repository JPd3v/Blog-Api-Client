import './App.css';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingPage from './utils/LoadingPage';
import PageLayout from './utils/PageLayout';
import PageNotFound from './pages/PageNotFound';

const Home = lazy(() => import('./pages/Home'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const AuthorPage = lazy(() => import('./pages/AuthorPage'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<BlogArticle />} />
            <Route path="/author/:id" element={<AuthorPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
