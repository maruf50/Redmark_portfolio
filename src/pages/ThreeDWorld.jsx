import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Compass } from 'lucide-react';

export const ThreeDWorld = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#030712' }}>
      {/* Top Floating Control Bar */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 16px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '9999px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#f8fafc',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.04em',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#f8fafc')}
        >
          <ArrowLeft size={16} />
          <span>Exit 3D World</span>
        </Link>

        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}>|</span>

        <a
          href="/3d/index.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#94a3b8',
            textDecoration: 'none',
            fontSize: '12px',
            fontFamily: 'var(--font-mono, monospace)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#f8fafc')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          title="Open in standalone tab"
        >
          <span>Fullscreen Tab</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* 3D App Iframe */}
      <iframe
        src="/3d/index.html"
        title="3D Interactive Universe"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
      />
    </div>
  );
};
