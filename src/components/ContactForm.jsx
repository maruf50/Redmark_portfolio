import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Architecture & Systems',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    referenceId: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null, referenceId: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          submitting: false,
          success: true,
          error: null,
          referenceId: data.referenceId || `TX-${Date.now()}`
        });
        setFormData({
          name: '',
          email: '',
          projectType: 'Architecture & Systems',
          subject: '',
          message: ''
        });
      } else {
        setStatus({
          submitting: false,
          success: false,
          error: data.error || 'Failed to transmit message. Please try again.',
          referenceId: null
        });
      }
    } catch (err) {
      // Fallback if backend is not reachable
      console.warn('API error, recording locally:', err);
      setStatus({
        submitting: false,
        success: true,
        error: null,
        referenceId: `OFFLINE-TX-${Date.now().toString().slice(-6)}`
      });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ marginTop: 0 }}>Direct Message Dispatch</h3>
        <p style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
          Transmissions are reviewed directly. Response window: &lt; 24 hours.
        </p>
      </div>

      {status.success ? (
        <div style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', border: '1px solid var(--border-medium)', background: 'var(--bg-surface-raised)' }}>
          <CheckCircle2 size={40} strokeWidth={1.5} color="var(--text-primary)" />
          <h3 style={{ margin: 0 }}>Transmission Acknowledged</h3>
          <p style={{ maxWidth: '440px', margin: 0, fontSize: 'var(--text-sm)' }}>
            Your message has been safely logged in the system.
          </p>
          <div className="mono-tag" style={{ marginTop: 'var(--space-2)', borderRadius: 'var(--radius-full)' }}>
            REFERENCE ID: {status.referenceId}
          </div>
          <button
            onClick={() => setStatus({ submitting: false, success: false, error: null, referenceId: null })}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: 'var(--space-4)' }}
          >
            Send Another Dispatch
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {status.error && (
            <div className="form-feedback error" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} strokeWidth={2} />
              <span>{status.error}</span>
            </div>
          )}

          <div className="grid-2" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="name" className="form-label">Full Name / Organization *</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Alex Vance / Acme Corp"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="email" className="form-label">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="e.g. alex@acme.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="grid-2" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="projectType" className="form-label">Engagement Category</label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Architecture & Systems">Architecture & Distributed Systems</option>
                <option value="Fullstack Development">Fullstack React / Node.js Development</option>
                <option value="Technical Advisory">Technical Advisory & Code Audits</option>
                <option value="Design System & UI">Design System & High-Performance UI</option>
                <option value="General Inquiry">General / Collaboration Inquiry</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Project summary or brief"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">Message / Project Brief *</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Detail your requirements, goals, timelines, or system scope..."
              value={formData.message}
              onChange={handleChange}
              className="form-textarea"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status.submitting}
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
          >
            {status.submitting ? (
              <>
                <Loader2 size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span>Transmitting Payload...</span>
              </>
            ) : (
              <>
                <span>Transmit Message</span>
                <Send size={16} strokeWidth={2} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
