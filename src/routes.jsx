import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Works } from './pages/Works';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { CustomPageTemplate } from './pages/CustomPageTemplate';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <div className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
    <div className="container" style={{ textAlign: 'center' }}>
      <h1 style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-4xl)' }}>Page Not Located</h1>
      <p style={{ marginTop: 'var(--space-2)', maxWidth: '460px', margin: 'var(--space-2) auto 0' }}>
        The route you are attempting to reach is either deprecated or does not exist in the active namespace.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 'var(--space-8)' }}>
        <ArrowLeft size={16} />
        <span>Return to System Overview</span>
      </Link>
    </div>
  </div>
);

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Boilerplate template for user to duplicate or preview */}
        <Route path="/custom-template" element={<CustomPageTemplate />} />
        
        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
