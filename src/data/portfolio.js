export const portfolioData = {
  profile: {
    name: "RedMARK",
    role: "Software Engineer & Systems Architect",
    headline: "Architecting high-throughput distributed systems & minimalist digital software.",
    bio: "I design and build resilient digital products with an emphasis on engineering clarity, high performance, and zero bloat. With extensive experience across fullstack React ecosystems, Node.js microservices, and distributed cloud topologies, I turn complex requirements into robust, maintainable systems.",
    availability: "Available for Q3/Q4 Senior Engagements & Advisory",
    location: "Global / Remote",
    timezone: "UTC / Available Worldwide",
    email: "3dmaruf55@gmail.com",
    socials: {
      github: "https://github.com/maruf50",
      linkedin: "https://www.linkedin.com/in/maruf-hossain-45080a178/",
      twitter: "https://x.com",
      cal: "https://cal.com"
    },
    metrics: [
      { label: "Years in Production", value: "07+" },
      { label: "Systems Engineered", value: "40+" },
      { label: "Uptime Reliability", value: "99.99%" },
      { label: "API Requests / Day", value: "12M+" }
    ]
  },

  projects: [
    {
      id: "hyperion-engine",
      title: "Hyperion Distributed Event Mesh",
      category: "Architecture & Cloud",
      year: "2025",
      summary: "Ultra-low-latency event streaming engine handling real-time telemetry and state distribution across multi-region nodes.",
      challenge: "Processing over 50,000 telemetry events per second with sub-15ms end-to-end latency while maintaining strict ordering guarantees across geo-distributed worker nodes.",
      solution: "Engineered an asynchronous Node.js streaming architecture coupled with zero-copy buffer serialization and distributed Redis cluster replication.",
      metrics: ["50k+ events/sec", "<12ms latency", "0% data drop"],
      stack: ["Node.js", "Redis Cluster", "WebSockets", "Docker", "TypeScript"],
      liveUrl: "https://example.com/hyperion",
      githubUrl: "https://github.com/example/hyperion-engine",
      featured: true,
      architecturePoints: [
        "Zero-copy stream buffer parsing",
        "Deterministic raft-based cluster consensus",
        "Automated backpressure control under peak traffic",
        "Edge routing with health-check failover"
      ]
    },
    {
      id: "monolith-ui",
      title: "Monolith Design System & Token Engine",
      category: "Frontend & UI",
      year: "2025",
      summary: "A strict monochrome design system and component architecture built for high-density enterprise dashboard interfaces.",
      challenge: "Standardizing 120+ interface modules across 4 disparate enterprise apps while enforcing strict accessibility standards (WCAG AAA) and sub-50ms render times.",
      solution: "Designed a token-first architecture in pure CSS variables and modular React primitives, eliminating runtime CSS-in-JS overhead entirely.",
      metrics: ["100% WCAG AAA Compliant", "0kb runtime CSS-in-JS", "40+ Components"],
      stack: ["React 18", "Pure CSS Variables", "Manrope Typography", "Vite", "Storybook"],
      liveUrl: "https://example.com/monolith",
      githubUrl: "https://github.com/example/monolith-ui",
      featured: true,
      architecturePoints: [
        "Modular headless component primitives",
        "Zero-dependency CSS token architecture",
        "Strict keyboard navigation & screen-reader tree",
        "Sub-millisecond theme synchronization"
      ]
    },
  ],

  experience: [
    {
      role: "Lead Systems Architect",
      company: "Vector Grid Systems",
      period: "2023 — Present",
      location: "Remote",
      description: "Spearheaded the design and rollout of a distributed microservice platform handling real-time telemetry data. Mentored 12 engineers across backend and frontend guilds.",
      highlights: [
        "Reduced p99 API response times by 48% across core endpoints",
        "Designed and standardized company-wide TypeScript/Node.js architectural guidelines",
        "Architected multi-region failover strategy with zero planned downtime"
      ]
    },
    {
      role: "Senior Fullstack Engineer",
      company: "Apex Digital Labs",
      period: "2021 — 2023",
      location: "San Francisco / Remote",
      description: "Built mission-critical React web applications, internal developer tools, and Node.js REST/GraphQL APIs for high-growth enterprise clients.",
      highlights: [
        "Engineered token-driven design system adopted across 8 distinct web applications",
        "Replaced legacy monolith with event-driven microservices architecture",
        "Achieved 100/100 Core Web Vitals score across public facing portals"
      ]
    },
    {
      role: "Software Engineer",
      company: "Kinesis Interactive",
      period: "2019 — 2021",
      location: "New York, NY",
      description: "Developed performant user interfaces, real-time dashboards, and Node.js microservices. Integrated third-party payment and identity providers.",
      highlights: [
        "Developed custom real-time data visualization charts in React and SVG",
        "Decreased frontend bundle sizes by 35% through dynamic code splitting",
        "Maintained 99.9% unit & integration test coverage on backend APIs"
      ]
    }
  ],

  skills: {
    languages: ["TypeScript", "JavaScript (ESNext)", "SQL", "HTML5", "CSS3 / Custom Properties"],
    backend: ["Node.js", "Express", "REST APIs", "GraphQL", "PostgreSQL", "Redis", "WebSockets"],
    frontend: ["React 18", "React Router", "Vite", "Design Systems", "Manrope & Web Typography", "WCAG Accessibility"],
    devops: ["Docker", "Git / GitHub Actions", "CI/CD Pipelines", "Linux / Shell", "AWS / GCP", "Nginx"]
  },

  faqs: [
    {
      question: "What is your primary engineering focus?",
      answer: "I specialize in end-to-end fullstack development, with a specific focus on high-performance React frontend architectures, robust Node.js backend services, and clean API design with zero unnecessary dependencies."
    },
    {
      question: "Are you available for freelance projects or full-time roles?",
      answer: "I accept select technical advisory, system architecture contracts, and fullstack engineering projects. Feel free to send an inquiry via the contact form with your project timeline and specifications."
    },
    {
      question: "What is your development and communication process?",
      answer: "I operate with clear documentation, structured sprint milestones, and transparent async updates. Every project begins with a technical specification before any code is written, ensuring alignment and rapid delivery."
    },
    {
      question: "How do you ensure code quality and maintainability?",
      answer: "By keeping architectures minimal, modular, and strictly structured. I prioritize clean type definitions, comprehensive automated testing, semantic markup, and thorough documentation."
    }
  ]
};
