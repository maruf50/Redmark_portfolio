import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Cpu, Layers, Terminal, Database, Code2 } from 'lucide-react';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Architecture & Cloud':
      return <Cpu size={24} strokeWidth={1.5} />;
    case 'Frontend & UI':
      return <Layers size={24} strokeWidth={1.5} />;
    case 'Fullstack Systems':
      return <Database size={24} strokeWidth={1.5} />;
    case 'Developer Tools':
      return <Terminal size={24} strokeWidth={1.5} />;
    default:
      return <Code2 size={24} strokeWidth={1.5} />;
  }
};

export const ProjectCard = ({ project }) => {
  return (
    <Link to={`/project/${project.id}`} className="project-card">
      {/* Clean, Minimalist Rounded Preview */}
      <div className="project-preview">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}>
          {getCategoryIcon(project.category)}
        </div>
      </div>

      {/* Card Info */}
      <div className="project-content">
        <div className="project-meta">
          <span className="mono-tag" style={{ borderRadius: 'var(--radius-full)' }}>{project.category}</span>
          <span className="mono-label">{project.year}</span>
        </div>

        <div className="project-title">
          <span>{project.title}</span>
          <ArrowUpRight size={18} strokeWidth={2} style={{ flexShrink: 0 }} />
        </div>

        <p className="project-desc">
          {project.summary}
        </p>

        <div className="project-tags">
          {project.stack.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="project-tag-pill">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
