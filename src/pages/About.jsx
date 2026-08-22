import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Download, Code2, Database, Terminal, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const About = () => {
  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <div className="section-title">
            <h1>About & Engineering History</h1>
          </div>
        </div>

        {/* Bio Grid */}
        <div className="grid-2" style={{ gap: 'var(--space-10)', marginBottom: 'var(--space-16)', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, color: 'var(--text-primary)' }}>
              I am a Software Engineer and Systems Architect dedicated to crafting reliable, high-performance distributed systems, resilient backends, and bespoke user interfaces.
            </p>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}>
              Over the past 7+ years, I have architected backend event meshes processing millions of daily transactions, engineered modular design systems across enterprise applications, and led cross-functional engineering teams to eliminate technical debt.
            </p>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}>
              I adhere strictly to principles of zero bloat, high typographic standards, and deterministic system behavior. I treat architecture not merely as code that works today, but as a long-term foundation that remains easy to maintain, refactor, and scale.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', paddingTop: 'var(--space-2)' }}>
              <Link to="/contact" className="btn btn-primary">
                <span>Start a Conversation</span>
                <ArrowUpRight size={16} strokeWidth={2} />
              </Link>
              <a href="#skills-matrix" className="btn btn-secondary">
                <span>View Tech Matrix</span>
              </a>
            </div>
          </div>

          {/* Quick Facts / Hardware Profile Card */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--bg-surface)', padding: 'var(--space-8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Specifications</span>
              <span className="mono-tag" style={{ borderRadius: 'var(--radius-full)' }}>ACTIVE</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>CURRENT FOCUS</span>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', marginTop: '4px' }}>
                  Distributed Microservices, Zero-Copy Stream Processing, React Token Engines
                </p>
              </div>

              <div className="divider"></div>

              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>LOCATION & TIMEZONE</span>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', marginTop: '4px' }}>
                  {portfolioData.profile.location} ({portfolioData.profile.timezone})
                </p>
              </div>

              <div className="divider"></div>

              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>PRIMARY COMM PROTOCOL</span>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', marginTop: '4px' }}>
                  {portfolioData.profile.email}
                </p>
              </div>

              <div className="divider"></div>

              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>CORE METHODOLOGY</span>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', marginTop: '4px' }}>
                  Spec-Driven Development, Zero Bloat, 100% Type & Test Coverage
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <div className="section-header">
            <h2>Work Experience & Impact</h2>
          </div>

          <div className="timeline">
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="timeline-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <span className="timeline-company">{exp.company} // {exp.period}</span>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>{exp.description}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                  {exp.highlights.map((h, hIdx) => (
                    <div key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={13} strokeWidth={2} style={{ flexShrink: 0, color: 'var(--text-primary)' }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Tech Stack Matrix */}
        <div id="skills-matrix" style={{ marginBottom: 'var(--space-16)' }}>
          <div className="section-header">
            <h2>Capabilities & Technologies</h2>
          </div>

          <div className="grid-2" style={{ gap: 'var(--space-6)' }}>
            <div style={{ padding: 'var(--space-6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
                <Code2 size={18} strokeWidth={2} />
                <h4 style={{ fontSize: 'var(--text-base)' }}>Languages & Runtimes</h4>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {portfolioData.skills.languages.map((skill, sIdx) => (
                  <span key={sIdx} className="mono-tag" style={{ borderRadius: 'var(--radius-full)' }}>{skill}</span>
                ))}
              </div>
            </div>

            <div style={{ padding: 'var(--space-6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
                <Database size={18} strokeWidth={2} />
                <h4 style={{ fontSize: 'var(--text-base)' }}>Backend & Data Architecture</h4>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {portfolioData.skills.backend.map((skill, sIdx) => (
                  <span key={sIdx} className="mono-tag" style={{ borderRadius: 'var(--radius-full)' }}>{skill}</span>
                ))}
              </div>
            </div>

            <div style={{ padding: 'var(--space-6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
                <Cpu size={18} strokeWidth={2} />
                <h4 style={{ fontSize: 'var(--text-base)' }}>Frontend Systems & UI</h4>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {portfolioData.skills.frontend.map((skill, sIdx) => (
                  <span key={sIdx} className="mono-tag" style={{ borderRadius: 'var(--radius-full)' }}>{skill}</span>
                ))}
              </div>
            </div>

            <div style={{ padding: 'var(--space-6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
                <Terminal size={18} strokeWidth={2} />
                <h4 style={{ fontSize: 'var(--text-base)' }}>DevOps & Infrastructure</h4>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {portfolioData.skills.devops.map((skill, sIdx) => (
                  <span key={sIdx} className="mono-tag" style={{ borderRadius: 'var(--radius-full)' }}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
