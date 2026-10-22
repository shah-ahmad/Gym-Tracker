<div align="center">

# GymTracker

### A clearer view of your fitness journey.

A fitness dashboard concept that brings workouts, hydration, body weight, and gym attendance into one focused interface.

![Status: UI Prototype](https://img.shields.io/badge/Status-UI_Prototype-318b55?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-Semantic_Markup-e34f26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Responsive_Design-1572b6?style=flat-square&logo=css&logoColor=white)
![Dependencies](https://img.shields.io/badge/Dev_Tool-Vite-555555?style=flat-square)

[Overview](#overview) · [Dashboard](#dashboard-at-a-glance) · [Run Locally](#run-locally) · [Roadmap](#development-roadmap)

</div>

---

## Overview

GymTracker is an academic web application project exploring how a single dashboard can make daily fitness information easier to understand. The interface presents a user's workout plan, water intake, weight trend, attendance, and recent activity without requiring them to switch between separate views.

The current deliverable is a **static, responsive dashboard built with HTML and CSS**. It establishes the visual design and information structure for future application development. All values are sample data; buttons and navigation demonstrate appearance and hover states only.

## Dashboard at a Glance

| Area | What the prototype presents |
| :--- | :--- |
| **Daily overview** | A personalized greeting and a concise motivational message. |
| **Today's workout** | A sample push-day routine and a styled workout action. |
| **Hydration** | Sample water intake with a visual progress indicator. |
| **Body weight** | A sample weight measurement and change from the previous week. |
| **Gym attendance** | A sample session count with a weekly comparison. |
| **Weekly activity** | A CSS bar chart showing example activity across seven days. |
| **Recent workouts** | Sample sessions with dates, muscle groups, durations, and completion labels. |
| **Navigation** | A persistent sidebar presenting the intended application sections. |

## Design Approach

- **Clear visual hierarchy:** summary cards place daily information above detailed activity history.
- **Consistent visual language:** a dark sidebar, light surfaces, and green accents connect the interface.
- **Responsive layout:** cards and content reorganize for desktop, tablet, and narrow mobile screens.
- **Subtle feedback:** navigation, buttons, cards, and chart bars have CSS hover effects.
- **Accessibility considerations:** semantic page regions, labeled icon controls, visible keyboard focus, descriptive chart text, and reduced-motion support.

## Technology

| Layer | Current implementation |
| :--- | :--- |
| Structure | HTML5 |
| Styling and layout | CSS3, Grid, Flexbox, and media queries |
| Icons | Inline SVG symbols |
| Typography | Inter through Google Fonts, with Arial and system sans-serif fallbacks |
| Application logic | Not implemented in this phase |
| Backend and persistence | Not implemented in this phase |

The dashboard uses CSS for its visual interactions and chart rendering. Vite provides an optional development server with automatic refresh and a production build command; no JavaScript framework is used.

## Run Locally

### Recommended — Vite development server

With Node.js and npm installed, run these commands from the repository directory:

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal. Changes to HTML and CSS refresh automatically. Stop the server with `Ctrl+C`.

Use `npm run build` to generate a production build in `dist/`, and `npm run preview` to preview that build.


### Option 1 — Open directly

Clone or download the repository, then open `index.html` in a browser.

```bash
git clone https://github.com/shah-ahmad/Gym-Tracker.git
cd Gym-Tracker
```

### Option 2 — Use a local server

With Python installed, run the following from the repository directory:

```bash
python -m http.server 8080 --bind 127.0.0.1
```

Then visit **[http://127.0.0.1:8080](http://127.0.0.1:8080)**. Stop the server with `Ctrl+C`.

> The Google Fonts typeface requires an internet connection. The page remains usable with fallback fonts when offline.

## Repository Structure

```text
Gym-Tracker/
├── index.html     # Dashboard markup, sample content, and SVG icons
├── styles.css     # Visual styling, hover states, and responsive layouts
├── README.md      # Project overview and local setup
└── test.txt       # Initial repository workflow test file
```

## Current Scope

This phase focuses on translating a dashboard reference into a browser-based interface using foundational web technologies.

**Included:** dashboard layout, sample content, responsive styling, SVG icons, CSS chart bars, hover effects, and keyboard focus styling.

**Planned:** interactive navigation, workout recording, editable hydration and weight entries, authentication, database storage, and statistics calculated from real records.

The sample dates, measurements, progress, and session history are fixed presentation content. They do not update automatically or persist user input.

## Development Roadmap

- [x] Build the initial dashboard in HTML and CSS.
- [x] Add responsive layouts and visual interaction states.
- [ ] Implement navigation and interactive data entry.
- [ ] Introduce a React frontend for application state and reusable components.
- [ ] Develop a FastAPI backend for workout and tracking endpoints.
- [ ] Connect PostgreSQL for persistent user and fitness records.
- [ ] Add authentication and user-specific dashboards.
- [ ] Generate statistics from recorded activity.
- [ ] Validate application behavior and accessibility across devices.

React, FastAPI, and PostgreSQL are the intended future stack; they are not part of the current implementation.

---

<div align="center">

**GymTracker** · Academic project · Static dashboard prototype

*Small steps every day lead to big results.*

</div>
