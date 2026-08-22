import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ArrowUpRight, CheckCircle2, Cpu, Terminal, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Services = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Technical Specification',
      description: 'Before any code is drafted, we define functional requirements, data schemas, API contracts, latency targets, and strict non-functional constraints.'
    },
    {
      step: '02',
      title: 'Architecture & Token Design',
      description: 'Creating formal system blueprints, event flow diagrams, and UI design tokens to guarantee modularity and zero structural drift.'
    },
    {
      step: '03',
      title: 'Execution & Rigorous Testing',
      description: 'Fast-paced, milestone-driven development backed by automated unit tests, integration suites, and strict performance profiling.'
    },
    {
      step: '04',
      title: 'Deployment & Continuous Observability',
      description: 'Zero-downtime production deployment, edge CDN configuration, telemetry instrumentation, and comprehensive documentation handover.'
    }
  ];

  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-title">
            <h1>Services & Technical Engagement</h1>
          </div>
          <p style={{ maxWidth: '680px', fontSize: 'var(--text-lg)', color: 'var(--text-secondary)' }}>
            High-caliber fullstack engineering, distributed systems architecture, and technical advisory available for fast-moving engineering teams.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid-3" style={{ marginBottom: 'var(--space-16)' }}>
          {portfolioData.services ? portfolioData.services.map((service, idx) => (
            <div key={idx} className="service-card">
              <span className="service-number">{service.number}</span>
              <h3 className="service-title">{service.title}</h3>
              <p style={{ fontSize: 'var(--text-sm)' }}>{service.description}</p>
              <div className="service-list">
                {service.deliverables.map((del, dIdx) => (
                  <span key={dIdx} className="service-item">
                    <CheckCircle2 size={14} strokeWidth={2} style={{ color: 'var(--text-primary)' }} />
                    {del}
                  </span>
                ))}
              </div>
            </div>
          )) : (
            <>
              <div className="service-card">
                <span className="service-number">01</span>
                <h3 className="service-title">Distributed Systems & API Architecture</h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>
                  Designing resilient Node.js backends, microservices, and high-throughput real-time APIs with sub-millisecond serialization.
                </p>
                <div className="service-list">
                  <span className="service-item"><CheckCircle2 size={14} strokeWidth={2} /> Microservices & REST/GraphQL</span>
                  <span className="service-item"><CheckCircle2 size={14} strokeWidth={2} /> Distributed Database Design</span>
                  <span className="service-item"><CheckCircle2 size={14} strokeWidth={2} /> Performance Auditing & Load Testing</span>
                </div>
              </div>

              <div className="service-card">
                <span className="service-number">02</span>
                <h3 className="service-title">Frontend Engineering & UI Systems</h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>
                  Building responsive, ultra-fast web applications in React with custom design tokens, Manrope typography, and zero-runtime CSS bloat.
                </p>
                <div className="service-list">
                  <span className="service-item"><CheckCircle2 size={14} strokeWidth={2} /> Fullstack React Applications</span>
                  <span className="service-item"><CheckCircle2 size={14} strokeWidth={2} /> Design Systems & Token Architecture</span>
                  <span className="service-item"><CheckCircle2 size={14} strokeWidth={2} /> 100% WCAG Accessibility</span>
                </div>
              </div>

              <div className="service-card">
                <span className="service-number">03</span>
                <h3 className="service-title">Technical Advisory & Code Auditing</h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>
                  Assisting startups and engineering leadership in refactoring legacy bottlenecks, eliminating technical debt, and modernizing CI/CD.
                </p>
                <div className="service-list">
                  <span className="service-item"><CheckCircle2 size={14} strokeWidth={2} /> Architectural Code Reviews</span>
                  <span className="service-item"><CheckCircle2 size={14} strokeWidth={2} /> Security & Vulnerability Scans</span>
                  <span className="service-item"><CheckCircle2 size={14} strokeWidth={2} /> Scalability Roadmaps</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 4-Phase Sprint Process */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <div className="section-header">
            <h2>How Engagements Function</h2>
          </div>

          <div className="grid-2" style={{ gap: 'var(--space-6)' }}>
            {processSteps.map((step, idx) => (
              <div key={idx} style={{ padding: 'var(--space-8)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--bg-surface)', transition: 'all var(--transition-normal)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  PHASE {step.step}
                </span>
                <h3 style={{ fontSize: 'var(--text-xl)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Rounded FAQ Accordion */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="accordion">
            {portfolioData.faqs.map((faq, idx) => (
              <div key={idx} className="accordion-item">
                <button
                  className="accordion-trigger"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.question}</span>
                  {openFaq === idx ? (
                    <Minus size={18} strokeWidth={2} />
                  ) : (
                    <Plus size={18} strokeWidth={2} />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="accordion-content">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rounded Call to action */}
        <div style={{ border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12) var(--space-8)', textAlign: 'center', backgroundColor: 'var(--bg-surface)' }}>
          <h2 style={{ marginTop: 'var(--space-2)' }}>Ready to build something exceptional?</h2>
          <p style={{ maxWidth: '540px', margin: 'var(--space-2) auto var(--space-6)', fontSize: 'var(--text-base)' }}>
            Submit an inquiry with your project specifications, target launch date, or system requirements.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            <span>Contact & Inquire</span>
            <ArrowUpRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
};
