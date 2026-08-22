import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { ProjectCard } from '../components/ProjectCard';

export const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Architecture & Cloud', 'Frontend & UI', 'Fullstack Systems', 'Developer Tools'];

  const filteredProjects = useMemo(() => {
    return portfolioData.projects.filter(project => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.stack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="section" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <div className="section-title">
            <h1>Selected Works & Architecture</h1>
            <span className="mono-tag" style={{ borderRadius: 'var(--radius-full)' }}>
              {filteredProjects.length} OF {portfolioData.projects.length} PROJECTS
            </span>
          </div>
          <p style={{ maxWidth: '680px', fontSize: 'var(--text-lg)', color: 'var(--text-secondary)' }}>
            An archive of production distributed engines, design systems, and developer tools built with high-velocity engineering and zero runtime bloat.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-10)' }}>
          {/* Category Filter Tabs */}
          <div className="filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
            <Search size={16} strokeWidth={2} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search stack, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '38px', paddingRight: '14px', paddingTop: '10px', paddingBottom: '10px', fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-full)' }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--space-16) var(--space-4)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--bg-surface)' }}>
            <h3 style={{ marginTop: 'var(--space-3)' }}>No projects match your query</h3>
            <p style={{ marginTop: 'var(--space-1)', fontSize: 'var(--text-sm)' }}>
              Try searching with another keyword or reset the category filter.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: 'var(--space-4)' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
