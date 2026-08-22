import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Terminal, Cpu, Layers, ShieldCheck, CheckCircle2, Compass, Sparkles, Rocket } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { ProjectCard } from '../components/ProjectCard';

export const Home = () => {
  const featuredProjects = portfolioData.projects.filter(p => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="section-hero">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '940px' }}>
            {/* <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <div className="status-indicator">
                <span className="status-dot"></span>
                <span>{portfolioData.profile.availability.toUpperCase()}</span>
              </div>
            </div> */}

            <h1 style={{ letterSpacing: '-0.04em', lineHeight: 1.15 }}>
              Architecting high-throughput distributed systems & minimalist digital software.
            </h1>

            <p style={{ fontSize: 'var(--text-xl)', maxWidth: '760px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {portfolioData.profile.bio}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', paddingTop: 'var(--space-2)' }}>
              <Link to="/works" className="btn btn-primary btn-lg">
                <span>View Selected Works</span>
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">
                <span>Initiate Engagement</span>
                <ArrowUpRight size={18} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Monochromatic Ticker */}
      <div className="ticker-container">
        <div className="ticker-track">
          <span className="ticker-item">
            <Cpu size={14} strokeWidth={1.75} />
            DISTRIBUTED MICROSERVICES
          </span>
          <span className="ticker-item">
            <Layers size={14} strokeWidth={1.75} />
            REACT 18 & TOKEN ARCHITECTURE
          </span>
          <span className="ticker-item">
            <Terminal size={14} strokeWidth={1.75} />
            NODE.JS STREAMING ENGINES
          </span>
          <span className="ticker-item">
            <ShieldCheck size={14} strokeWidth={1.75} />
            ZERO-TRUST IDENTITY GATEWAYS
          </span>
          <span className="ticker-item">
            <Cpu size={14} strokeWidth={1.75} />
            DISTRIBUTED MICROSERVICES
          </span>
          <span className="ticker-item">
            <Layers size={14} strokeWidth={1.75} />
            REACT 18 & TOKEN ARCHITECTURE
          </span>
          <span className="ticker-item">
            <Terminal size={14} strokeWidth={1.75} />
            NODE.JS STREAMING ENGINES
          </span>
          <span className="ticker-item">
            <ShieldCheck size={14} strokeWidth={1.75} />
            ZERO-TRUST IDENTITY GATEWAYS
          </span>
        </div>
      </div>

      {/* Rounded Metrics Section */}
      <section className="section" style={{ padding: 'var(--space-16) 0' }}>
        <div className="container">
          <div className="grid-4">
            {portfolioData.profile.metrics.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: 'var(--space-6)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'all var(--transition-normal)'
                }}
              >
                <span style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, fontFamily: 'var(--font-sans)', letterSpacing: '-0.03em' }}>
                  {item.value}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title">
              <h2>Featured Projects</h2>
              <Link to="/works" className="btn btn-secondary btn-sm">
                <span>View Full Catalog ({portfolioData.projects.length})</span>
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div className="grid-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 3D Navigation Showcase Section */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid #ffffff',
              backgroundColor: '#ffffff',
              color: '#09090b',
              padding: 'var(--space-12) var(--space-10)',
              boxShadow: '0 20px 50px rgba(255, 255, 255, 0.08)'
            }}
          >
            <div className="grid-2" style={{ alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', backgroundColor: '#f4f4f5', border: '1px solid #e4e4e7', width: 'fit-content' }}>
                  <Compass size={14} style={{ color: '#09090b' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#09090b', fontFamily: 'var(--font-mono)' }}>
                    INTERACTIVE EXPERIMENTAL HUB
                  </span>
                </div>

                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em', margin: 0, color: '#09090b' }}>
                  3D Interactive Space Navigation
                </h2>

                <p style={{ color: '#3f3f46', lineHeight: 1.7, margin: 0, fontSize: 'var(--text-base)' }}>
                  Experience an interactive 3D universe. Pilot your custom third-person spaceship through planetary sectors, engage real-time particle mechanics, and discover portfolio milestones.
                </p>

                <div style={{ paddingTop: 'var(--space-4)' }}>
                  <Link
                    to="/3d"
                    className="btn btn-lg"
                    style={{
                      display: 'inline-flex',
                      gap: '10px',
                      backgroundColor: '#09090b',
                      color: '#ffffff',
                      borderColor: '#09090b',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700
                    }}
                  >
                    <Rocket size={18} />
                    <span>Navigate in 3D world</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Visual Card Graphic / Feature Grid */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  borderLeft: '1px solid #e4e4e7',
                  paddingLeft: 'var(--space-8)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', backgroundColor: '#f4f4f5', border: '1px solid #e4e4e7' }}>
                    <Sparkles size={16} style={{ color: '#09090b' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--text-base)', margin: '0 0 4px 0', color: '#09090b' }}>Three.js Particle Engine</h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: '#52525b', margin: 0 }}>Real-time 3D webGL graphics with fluid celestial body lighting and speed boosts.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', backgroundColor: '#f4f4f5', border: '1px solid #e4e4e7' }}>
                    <Compass size={16} style={{ color: '#09090b' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--text-base)', margin: '0 0 4px 0', color: '#09090b' }}>Interactive Planetary Sectors</h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: '#52525b', margin: 0 }}>Fly towards target celestial bodies to lock on and inspect project archives.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="section" style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title">
              <h2>Engineering Capabilities</h2>
              <Link to="/services" className="btn btn-secondary btn-sm">
                <span>Services & Process Details</span>
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div className="grid-3">
            <div className="service-card">
              <span className="service-number">01</span>
              <h3 className="service-title">Distributed Systems & API Architecture</h3>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                Engineering fault-tolerant backend nodes, high-speed streaming protocols, and low-latency microservices with Node.js and Redis.
              </p>
              <div className="service-list">
                <span className="service-item">
                  <CheckCircle2 size={14} strokeWidth={2} />
                  Event-Driven Architectures
                </span>
                <span className="service-item">
                  <CheckCircle2 size={14} strokeWidth={2} />
                  REST & GraphQL Endpoints
                </span>
                <span className="service-item">
                  <CheckCircle2 size={14} strokeWidth={2} />
                  High-Concurrency Telemetry
                </span>
              </div>
            </div>

            <div className="service-card">
              <span className="service-number">02</span>
              <h3 className="service-title">High-Performance Frontend Systems</h3>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                Building zero-bloat web apps with React, custom CSS variable tokens, Manrope typography, and sub-50ms user interactions.
              </p>
              <div className="service-list">
                <span className="service-item">
                  <CheckCircle2 size={14} strokeWidth={2} />
                  Modular Design Systems
                </span>
                <span className="service-item">
                  <CheckCircle2 size={14} strokeWidth={2} />
                  Fluid Manrope Typography Scale
                </span>
                <span className="service-item">
                  <CheckCircle2 size={14} strokeWidth={2} />
                  100% WCAG AAA Accessibility
                </span>
              </div>
            </div>

            <div className="service-card">
              <span className="service-number">03</span>
              <h3 className="service-title">Technical Advisory & Code Auditing</h3>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                Evaluating mission-critical codebases to identify security vectors, memory bottlenecks, and scale limitations before production.
              </p>
              <div className="service-list">
                <span className="service-item">
                  <CheckCircle2 size={14} strokeWidth={2} />
                  Architecture Code Reviews
                </span>
                <span className="service-item">
                  <CheckCircle2 size={14} strokeWidth={2} />
                  Performance Profiling & Optimization
                </span>
                <span className="service-item">
                  <CheckCircle2 size={14} strokeWidth={2} />
                  Zero-Downtime Migration Plans
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy Statement */}
      <section className="section">
        <div className="container">
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12) var(--space-10)', backgroundColor: 'var(--bg-surface)' }}>
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <h2>Zero Bloat. Pure Precision. Architectural Rigor.</h2>
                <p>
                  I believe that the best software is disciplined, readable, and devoid of needless abstraction.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', borderLeft: '1px solid var(--border-subtle)', paddingLeft: 'var(--space-8)' }}>
                <div>
                  <h4 style={{ fontSize: 'var(--text-base)', marginBottom: '4px' }}>Clarity Over Cleverness</h4>
                  <p style={{ fontSize: 'var(--text-sm)' }}>Self-documenting architectures that outlive industry hype cycles.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: 'var(--text-base)', marginBottom: '4px' }}>Deterministic Performance</h4>
                  <p style={{ fontSize: 'var(--text-sm)' }}>Predictable latency profiles and zero runtime stylesheet bloat.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: 'var(--text-base)', marginBottom: '4px' }}>End-to-End Ownership</h4>
                  <p style={{ fontSize: 'var(--text-sm)' }}>From schema design to pixel-perfect component rendering.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rounded Call to Action */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-main)', padding: 'var(--space-12) var(--space-10)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-6)', borderRadius: 'var(--radius-2xl)' }}>
            <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <h2 style={{ color: 'var(--bg-main)', margin: 0 }}>
                Have a project or architectural challenge?
              </h2>
              <p style={{ color: 'var(--bg-main)', opacity: 0.85, fontSize: 'var(--text-base)' }}>
                Let's discuss system specifications, deliverables, and timelines.
              </p>
            </div>

            <Link
              to="/contact"
              className="btn btn-secondary btn-lg"
              style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)', borderColor: 'var(--bg-main)', borderRadius: 'var(--radius-full)' }}
            >
              <span>Initiate Transmission</span>
              <ArrowUpRight size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
