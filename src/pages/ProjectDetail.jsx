import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Cpu, Layers, Database, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const ProjectDetail = () => {
  const { id } = useParams();

  const projectIndex = portfolioData.projects.findIndex(p => p.id === id);
  const project = portfolioData.projects[projectIndex];

  if (!project) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ marginTop: 'var(--space-4)' }}>System Spec Not Found</h1>
          <p style={{ marginTop: 'var(--space-2)' }}>The requested project ID does not exist in the active catalog.</p>
          <Link to="/works" className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }}>
            <ArrowLeft size={16} />
            <span>Return to Works Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const nextProject = portfolioData.projects[(projectIndex + 1) % portfolioData.projects.length];

  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Back Link */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <Link to="/works" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={14} strokeWidth={2} />
            <span>BACK TO ALL WORKS</span>
          </Link>
        </div>

        {/* Project Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <span className="mono-tag" style={{ borderRadius: 'var(--radius-full)' }}>{project.category}</span>
            <span className="mono-label">{project.year}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}>
            {project.title}
          </h1>

          <p style={{ fontSize: 'var(--text-xl)', maxWidth: '820px', color: 'var(--text-secondary)' }}>
            {project.summary}
          </p>

          {/* Action Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', paddingTop: 'var(--space-2)' }}>
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              <span>View Live Deployment</span>
              <ExternalLink size={16} strokeWidth={2} />
            </a>
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
              <Github size={16} strokeWidth={1.75} />
              <span>Source Repository</span>
            </a>
          </div>
        </div>

        {/* Architectural Schematic Graphic (Monochrome B&W Blueprint) */}
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-2xl)', backgroundColor: 'var(--bg-surface)', padding: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Architecture & Data Flow</span>
            <span className="mono-tag" style={{ borderRadius: 'var(--radius-full)' }}>V{project.year.slice(2)}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', backgroundColor: 'var(--bg-main)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Cpu size={16} strokeWidth={1.75} />
                <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>CLIENT / INGESTION</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                Zero-copy edge buffer validation with rate-limiting throttling.
              </p>
            </div>

            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', backgroundColor: 'var(--bg-main)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Layers size={16} strokeWidth={1.75} />
                <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>PROCESSING MESH</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                Deterministic worker queue cluster with async backpressure control.
              </p>
            </div>

            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', backgroundColor: 'var(--bg-main)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Database size={16} strokeWidth={1.75} />
                <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>PERSISTENCE LAYER</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                Multi-region partition failover with read-replica consistency.
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics / Benchmark Highlights */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <div className="section-header">
            <h2>Verified System Metrics</h2>
          </div>
          <div className="grid-3" style={{ marginTop: 'var(--space-4)' }}>
            {project.metrics.map((metric, idx) => (
              <div key={idx} style={{ padding: 'var(--space-6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-surface)' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>METRIC 0{idx + 1}</span>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginTop: 'var(--space-2)', color: 'var(--text-primary)' }}>
                  {metric}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge vs Solution */}
        <div className="grid-2" style={{ gap: 'var(--space-10)', marginBottom: 'var(--space-12)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h2>The Challenge & Constraints</h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}>
              {project.challenge}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h2>Implementation Strategy</h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.8 }}>
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Architecture Points */}
        <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--bg-surface)', padding: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
          <h3 style={{ marginTop: 0, marginBottom: 'var(--space-6)' }}>Technical Innovations</h3>
          
          <div className="grid-2" style={{ gap: 'var(--space-4)' }}>
            {project.architecturePoints.map((point, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                <CheckCircle2 size={16} strokeWidth={2} style={{ marginTop: '3px', flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Matrix */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)' }}>Technologies Deployed</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            {project.stack.map((tech, idx) => (
              <span key={idx} className="mono-tag" style={{ fontSize: 'var(--text-sm)', padding: '8px 18px', borderRadius: 'var(--radius-full)' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Next Project Footer Bar */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>NEXT CASE STUDY</span>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginTop: '4px' }}>
              {nextProject.title}
            </div>
          </div>
          <Link to={`/project/${nextProject.id}`} className="btn btn-secondary">
            <span>Explore Next Case Study</span>
            <ArrowUpRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
};
