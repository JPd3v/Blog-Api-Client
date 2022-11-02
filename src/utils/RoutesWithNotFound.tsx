import { Routes, Route } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';
import PageLayout from './PageLayout';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function RoutesWithNotFound({ children }: Props) {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        {children}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
