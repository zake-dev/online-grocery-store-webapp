import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { AppBar, SideBar } from '@/components';
import Router from '@/router';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <AppBar />
        <SideBar />
        <div className="main">
          <Router />
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
