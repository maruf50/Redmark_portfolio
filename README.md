# REDMARK — Professional Black & White Portfolio

 Website link: https://redmark-portfolio.vercel.app/

A high-performance, editorial-grade developer portfolio website built with **React (Vite)** and **Node.js (Express)**. 

### Design Philosophy & Rules
- **Pure Monochrome Palette**: Strict black (`#000000`) and white (`#ffffff`) with architectural zinc accents.
- **Zero Gradients**: No CSS gradients or multi-hue effects — pure typography, high contrast, and structural lines.
- **Typography**: Google Fonts **Manrope** (weights 300 to 800) with monospace accents (**JetBrains Mono**).
- **Single-Color Vector Icons**: Monochromatic SVG icons via `lucide-react` (zero emojis).
- **Modular & Extensible**: Architected for simple addition of custom pages, case studies, and backend endpoints.

---

## Quick Start

### 1. Installation
```bash
npm install
```

### 2. Run in Development Mode
Runs both the **Node.js backend** (port `5000`) and the **React frontend** (port `3000`) concurrently with live reload:
```bash
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000) (Proxied automatically via `/api/*`)

### 3. Production Build & Start
```bash
npm run build
npm start
```

---

## Project Structure

```
RedmarkPortfolio/
├── server/                    # Node.js & Express API Backend
│   ├── index.js               # Express server with /api/contact, /api/profile
│   └── data/
│       └── portfolioData.js   # Server-side portfolio data
├── src/                       # React Frontend Application
│   ├── components/            # Reusable UI Components
│   │   ├── Navbar.jsx         # Sticky header with B&W theme toggle
│   │   ├── Footer.jsx         # Architectural footer with live system clock
│   │   ├── ProjectCard.jsx    # High-contrast project preview card
│   │   ├── ContactForm.jsx    # Contact form wired to Express backend
│   │   └── ScrollToTop.jsx    # Route transition helper
│   ├── context/
│   │   └── ThemeContext.jsx   # Monochrome Dark/Light mode provider
│   ├── data/
│   │   └── portfolio.js       # Projects, experience, bio, and skills data
│   ├── pages/                 # Application Page Views
│   │   ├── Home.jsx           # Overview, hero, featured projects, principles
│   │   ├── Works.jsx          # Project catalog with search & category filters
│   │   ├── ProjectDetail.jsx  # Deep-dive case study with architecture blueprint
│   │   ├── About.jsx          # Biography, timeline, and tech stack matrix
│   │   ├── Services.jsx       # Services, 4-phase process, and FAQ accordion
│   │   ├── Contact.jsx        # Contact form, direct dispatch, and time status
│   │   └── CustomPageTemplate.jsx # Boilerplate for creating new pages
│   ├── styles/                # Handcrafted Vanilla CSS Design System
│   │   ├── tokens.css         # CSS Variables (B&W colors, Manrope typography, spacing)
│   │   ├── base.css           # Global resets, containers, typography scale
│   │   └── components.css     # Buttons, cards, navbars, forms, accordions
│   ├── App.jsx                # Application shell
│   ├── main.jsx               # React DOM entry point
│   └── routes.jsx             # Route definitions
├── index.html                 # HTML entry with Manrope font preloads
├── vite.config.js             # Vite configuration with API proxy
└── package.json
```

---

## How to Add Your Own Custom Pages

Adding new pages is completely seamless and requires only 3 simple steps:

### Step 1: Create your page component
Copy `src/pages/CustomPageTemplate.jsx` to a new file in `src/pages/` (e.g. `src/pages/Writing.jsx`):

```jsx
// src/pages/Writing.jsx
import React from 'react';

export const Writing = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="mono-label">[ ARTICLES & ESSAYS ]</span>
          <div className="section-title">
            <h1>Engineering Writing</h1>
          </div>
        </div>
        <p>Your content here...</p>
      </div>
    </div>
  );
};
```

### Step 2: Register the route in `src/routes.jsx`
Open `src/routes.jsx` and add your new route:

```jsx
import { Writing } from './pages/Writing';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/writing" element={<Writing />} />  {/* <-- Add here */}
      {/* other routes */}
    </Routes>
  );
};
```

### Step 3: Add to Navigation (Optional)
In `src/components/Navbar.jsx`, add your item to `navItems`:

```jsx
const navItems = [
  { label: 'Overview', path: '/' },
  { label: 'Works', path: '/works' },
  { label: 'Writing', path: '/writing' },  // <-- Add here
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
];
```

---

## Backend API Endpoints

- `GET /api/health` — Checks API server health and uptime.
- `GET /api/profile` — Retrieves profile information and key statistics.
- `GET /api/services` — Retrieves structured service tiers and deliverables.
- `POST /api/contact` — Submits a validated contact message dispatch.

---

## License
MIT
