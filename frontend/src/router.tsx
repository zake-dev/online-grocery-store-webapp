import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/page/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

export default router;
