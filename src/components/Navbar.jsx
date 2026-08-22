import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', path: '/' },
    { label: 'Works', path: '/works' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="navbar-header">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
            <div className="brand-mark">R</div>
            <span>{portfolioData.profile.name.toUpperCase()}</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Theme Toggle & Availability */}
          <div className="nav-actions">
            <div className="status-indicator" style={{ display: 'none' /* visible on wide screens */ }}>
              <span className="status-dot"></span>
              <span>Available</span>
            </div>

            <button
              onClick={toggleTheme}
              className="btn-icon"
              aria-label="Toggle Theme Mode"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun size={18} strokeWidth={1.75} />
              ) : (
                <Moon size={18} strokeWidth={1.75} />
              )}
            </button>

            <Link to="/contact" className="btn btn-primary btn-sm" style={{ display: 'none' /* shown in header on md+ */ }}>
              <span>Let's Talk</span>
              <ArrowUpRight size={14} strokeWidth={2} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="btn-icon mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
              end={item.path === '/'}
            >
              <span>{item.label}</span>
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </NavLink>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
            <Link
              to="/contact"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Initiate Transmission</span>
              <ArrowUpRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
