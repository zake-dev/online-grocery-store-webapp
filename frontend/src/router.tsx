import { Navigate, createBrowserRouter } from 'react-router-dom';

import { BrowsePage, CheckoutPage, ProductDetailsPage } from '@/page';

const router = createBrowserRouter([
  {
    path: 'browse',
    element: <BrowsePage />,
  },
  {
    path: 'browse/:productId',
    element: <ProductDetailsPage />,
  },
  {
    path: 'checkout',
    element: <CheckoutPage />,
  },
  {
    path: '*',
    element: <Navigate to="browse" replace />,
  },
]);

export default router;
