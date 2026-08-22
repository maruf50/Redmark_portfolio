import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, FileText, Code2, Sparkles } from 'lucide-react';

export const CustomPageTemplate = () => {
  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <div className="section-title">
            <h1>Custom Page Title</h1>
          </div>
          <p style={{ maxWidth: '680px', fontSize: 'var(--text-lg)', color: 'var(--text-secondary)' }}>
            This is a clean, modular page template pre-configured with the Black & White design system, Manrope typography, rounded card geometry, and single-color vector icons.
          </p>
        </div>

        {/* Example Content Grid 1: Two Column Layout */}
        <div className="grid-2" style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
          <div style={{ padding: 'var(--space-8)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--bg-surface)' }}>
            <h3 style={{ marginTop: 0, marginBottom: 'var(--space-3)' }}>Structural Feature Section</h3>
            <p style={{ fontSize: 'var(--text-sm)' }}>
              Add your custom text, markdown, research notes, or system documentation here. The layout automatically adapts across mobile, tablet, and widescreen monitors.
            </p>
            <div style={{ marginTop: 'var(--space-6)' }}>
              <Link to="/contact" className="btn btn-secondary btn-sm">
                <span>Action Link</span>
                <ArrowUpRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div style={{ padding: 'var(--space-8)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--bg-surface)' }}>
            <h3 style={{ marginTop: 0, marginBottom: 'var(--space-3)' }}>Feature List</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-sm)' }}>
                <CheckCircle2 size={15} strokeWidth={2} />
                <span>Zero gradient, high-contrast monochrome design tokens</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-sm)' }}>
                <CheckCircle2 size={15} strokeWidth={2} />
                <span>Google Font Manrope with crisp typographic hierarchy</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-sm)' }}>
                <CheckCircle2 size={15} strokeWidth={2} />
                <span>Rounded modern cards and smooth page transition animations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Example Content Grid 2: Three Column Cards */}
        <div className="grid-3">
          <div className="service-card">
            <span className="service-number">01</span>
            <h4 style={{ fontSize: 'var(--text-lg)' }}>Modular Architecture</h4>
            <p style={{ fontSize: 'var(--text-sm)' }}>
              Components are decoupled and easily reusable across any new subpage.
            </p>
          </div>

          <div className="service-card">
            <span className="service-number">02</span>
            <h4 style={{ fontSize: 'var(--text-lg)' }}>Clean Routing</h4>
            <p style={{ fontSize: 'var(--text-sm)' }}>
              Vite and React Router DOM provide lightning fast client-side navigation with transition animations.
            </p>
          </div>

          <div className="service-card">
            <span className="service-number">03</span>
            <h4 style={{ fontSize: 'var(--text-lg)' }}>Backend Ready</h4>
            <p style={{ fontSize: 'var(--text-sm)' }}>
              Connect any new endpoints to the Express Node.js server in `server/index.js`.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
