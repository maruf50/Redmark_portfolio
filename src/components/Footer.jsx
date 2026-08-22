import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Footer = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short'
      };
      setTimeString(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="navbar-brand">
              <div className="brand-mark">R</div>
              <span>{portfolioData.profile.name.toUpperCase()}</span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)' }}>
              {portfolioData.profile.headline} Built with high standards, zero gradients, and pure typography.
            </p>

          </div>

          {/* Links Columns */}
          <div className="footer-links-group">
            <div className="footer-column">
              <span className="footer-column-title">Navigation</span>
              <Link to="/" className="footer-link">Overview</Link>
              <Link to="/works" className="footer-link">Selected Works</Link>
              <Link to="/about" className="footer-link">About & History</Link>
              <Link to="/services" className="footer-link">Services & Process</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>

            <div className="footer-column">
              <span className="footer-column-title">Protocols</span>
              <a href={portfolioData.profile.socials.github} target="_blank" rel="noreferrer" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Github size={14} strokeWidth={1.75} />
                <span>GitHub</span>
              </a>
              <a href={portfolioData.profile.socials.linkedin} target="_blank" rel="noreferrer" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Linkedin size={14} strokeWidth={1.75} />
                <span>LinkedIn</span>
              </a>
              <a href={portfolioData.profile.socials.twitter} target="_blank" rel="noreferrer" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Twitter size={14} strokeWidth={1.75} />
                <span>X / Twitter</span>
              </a>
              <a href={`mailto:${portfolioData.profile.email}`} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} strokeWidth={1.75} />
                <span>Direct Email</span>
              </a>
            </div>

            <div className="footer-column">
              <span className="footer-column-title">System</span>
              <span className="footer-link" style={{ cursor: 'default' }}>Version 1.0.0</span>
              <span className="footer-link" style={{ cursor: 'default' }}>React 18 + Node.js</span>
              <span className="footer-link" style={{ cursor: 'default' }}>Manrope Typography</span>
              <button onClick={scrollToTop} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: 'var(--space-2)', textAlign: 'left' }}>
                <ArrowUp size={14} strokeWidth={2} />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {portfolioData.profile.name.toUpperCase()}. ALL RIGHTS RESERVED.</span>

        </div>
      </div>
    </footer>
  );
};
