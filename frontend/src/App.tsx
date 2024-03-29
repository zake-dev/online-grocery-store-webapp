import * as React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { AppBar, SideBar } from '@/components';
import { ShoppingCart } from '@/features/ShoppingCart';
import Router from '@/router';

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppBar />
          <SideBar />
          <div className="main">
            <Router />
          </div>
          <ShoppingCart />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
