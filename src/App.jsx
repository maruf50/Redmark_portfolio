import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AppRoutes } from './routes';

import './styles/theme-variables.css';
import './styles/base.css';
import './styles/components.css';

export const App = () => {
  const isEmbedded = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('embed') === 'true';

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: isEmbedded ? 'auto' : '100vh' }} className={isEmbedded ? 'embedded-page' : ''}>
          {!isEmbedded && <Navbar />}
          <main style={{ flex: 1 }}>
            <AppRoutes />
          </main>
          {!isEmbedded && <Footer />}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
