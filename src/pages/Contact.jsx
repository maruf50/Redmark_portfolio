import React, { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, Copy, Check, Clock, Globe, ArrowUpRight, Shield } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { ContactForm } from '../components/ContactForm';

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <div className="section-title">
            <h1>Contact & Collaboration</h1>
          </div>
          <p style={{ maxWidth: '680px', fontSize: 'var(--text-lg)', color: 'var(--text-secondary)' }}>
            Whether you require system architecture consulting, fullstack engineering, or technical advisory, submit your brief below.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid-2" style={{ gap: 'var(--space-10)', alignItems: 'start' }}>
          {/* Left Column: Form */}
          <div>
            <ContactForm />
          </div>

          {/* Right Column: Direct Info & Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Quick Contact Card */}
            <div style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)' }}>
              <h3>Direct Email Dispatch</h3>
              <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)', marginBottom: 'var(--space-4)' }}>
                For encrypted messages or direct RFPs:
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', background: 'var(--bg-main)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {portfolioData.profile.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="btn btn-ghost btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={14} strokeWidth={2} />
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)' }}>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} strokeWidth={2} />
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)' }}>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Operating Availability */}
            <div style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-4)' }}>Parameters</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Clock size={18} strokeWidth={1.75} />
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Response Window</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Within 24 business hours</div>
                  </div>
                </div>

                <div className="divider"></div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Globe size={18} strokeWidth={1.75} />
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Location & Presence</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{portfolioData.profile.location} (Remote-First)</div>
                  </div>
                </div>

                <div className="divider"></div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Shield size={18} strokeWidth={1.75} />
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Security & Confidentiality</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Mutual NDAs signed upon technical review</div>
                  </div>
                </div>
              </div>
            </div>

            {/* External Networks */}
            <div style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-4)' }}>Profiles</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <a href={portfolioData.profile.socials.github} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Github size={16} strokeWidth={1.75} />
                    GitHub Source Profile
                  </span>
                  <ArrowUpRight size={14} strokeWidth={2} />
                </a>

                <a href={portfolioData.profile.socials.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Linkedin size={16} strokeWidth={1.75} />
                    LinkedIn Network
                  </span>
                  <ArrowUpRight size={14} strokeWidth={2} />
                </a>

                <a href={portfolioData.profile.socials.twitter} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Twitter size={16} strokeWidth={1.75} />
                    X / Twitter Updates
                  </span>
                  <ArrowUpRight size={14} strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
