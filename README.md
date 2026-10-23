# The Flight Tech Labs

A modern, high-performance static web platform showcasing native desktop software and web applications created by **The Flight Tech Labs**.

---

## 🌐 Overview

**The Flight Tech Labs** serves as the central digital hub and distribution portal for our software suite and digital initiatives:

- **Featured Native Applications**: Flagship desktop tools including [ResumeForge AI](apps/resumeforge-ai/index.html)—an offline-first ATS resume engineering suite for Windows 10/11.
- **Projects & Ecosystem Showcase**: Interactive catalogue detailing live web applications, simulations, and platforms (including Silicon Matrix, NAVIK Simulator, Kumari Kandam, Škoda Volkswagen India Showcase, Oru Payanam Aayiram Kathaigal, and Lumisphere).
- **Lightweight Architecture**: Fully vanilla architecture (HTML5, modern CSS, dynamic ES6 JavaScript) engineered without heavyweight frameworks or build overhead. Content and catalogs are dynamically driven through clean JSON state schemas.

---

## ⚡ Architecture & Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend Core** | HTML5 / ES6 JavaScript | Semantic, zero-dependency client-side architecture with clean asynchronous data loading |
| **Design System** | Modern Vanilla CSS | Custom utility tokens, glassmorphism, responsive typography, and system dark theme (`assets/css/styles.css`) |
| **State & Data** | Structured JSON | Single source of truth for software releases (`apps.json`) and portfolio sites (`sites.json`) |
| **Routing & Hosting**| Vercel Engine | Clean URL routing (`/apps`, `/faq`), cache controls, custom redirects, and strict security headers via `vercel.json` |
| **SEO & Discoverability** | Standard Meta / XML | Structured Open Graph metadata, semantic document outlines, dynamic XML sitemap, and search engine directives (`robots.txt`) |

---

## 📁 Repository Structure

```text
flighttechlabs/
├── index.html                 # Platform landing & hero showcase
├── apps/
│   ├── index.html             # Software catalog (dynamically rendered from apps.json)
│   └── resumeforge-ai/
│       └── index.html         # Application showcase & release details
├── projects.html              # Web ecosystem directory (dynamically rendered from sites.json)
├── changelog.html             # Centralized versioning & release history
├── faq.html                   # Frequently Asked Questions & user guidance
├── about.html                 # Team overview, philosophy, and mission
├── contact.html               # Contact & communication portal
├── privacy.html               # Privacy Policy
├── terms.html                 # Terms of Service
├── 404.html                   # Custom error page
├── apps.json                  # Data schema: Application registry, releases & changelogs
├── sites.json                 # Data schema: Web projects, descriptions & URLs
├── vercel.json                # Deployment configuration, clean routing & HTTP headers
├── robots.txt                 # Crawler directives
├── sitemap.xml                # SEO index
├── assets/
│   ├── css/
│   │   └── styles.css         # Unified stylesheet & design system
│   ├── js/
│   │   └── main.js            # App hydration, theme handling & client logic
│   └── img/
│       └── favicon.svg        # Brand vector identity
└── downloads/
    └── README.txt             # Distribution asset guidelines & storage notes
```

---

## 📄 Data Schemas

The website utilizes declarative JSON files to manage content dynamically without touching markup:

### 1. Applications (`apps.json`)
Maintains metadata, distribution assets, feature lists, versioning, and release histories for desktop utilities.

```json
{
  "id": "resumeforge-ai",
  "slug": "resumeforge-ai",
  "name": "ResumeForge AI",
  "monogram": "RF",
  "tagline": "Offline-First ATS Resume Engineer",
  "description": "Desktop resume engineer for Windows.",
  "features": ["100% Offline", "Live Preview", "ATS Optimized"],
  "version": "1.0.0",
  "platform": "Windows 10 / 11 (64-bit)",
  "file": "https://github.com/.../releases/download/v1.0.0/...",
  "changelog": [
    {
      "version": "1.0.0",
      "date": "2026-10-23",
      "notes": ["Initial production release"]
    }
  ]
}
```

### 2. Projects & Sites (`sites.json`)
Drives the portfolio index on `projects.html` for associated web applications and client showcases.

```json
{
  "name": "NAVIK Simulator",
  "url": "https://navik-simulator.vercel.app/",
  "monogram": "NS",
  "category": "Simulation & Aviation",
  "about": "A web-based interactive navigation and flight simulator."
}
```

---

## 🔒 Security & Routing

Configured at the network edge via `vercel.json`:
- **Clean URLs**: Extensionless routing (e.g., `/projects` maps cleanly to `/projects.html`).
- **Security Headers**: Includes `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`, and strict `Referrer-Policy`.
- **Attachment Handling**: Content-Disposition controls for software delivery binaries.

---

## ⚖️ License & Copyright

© The Flight Tech Labs. All rights reserved.
