<div align="center">

# GymTracker

### Your training, in one place.

An academic fitness application prototype for viewing workout plans, exploring exercises, and reviewing daily activity.

![Status](https://img.shields.io/badge/Status-UI_Prototype-328A83?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-Semantic_Markup-183B45?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Responsive_Design-183B45?style=flat-square&logo=css&logoColor=white)
![Vite](https://img.shields.io/badge/Dev_Tool-Vite-328A83?style=flat-square&logo=vite&logoColor=white)

[Overview](#overview) · [Pages](#pages) · [Run locally](#run-locally) · [Roadmap](#development-roadmap)

</div>

---

## Overview

GymTracker explores how a clear interface can bring workout planning and fitness information together. The current deliverable is a **static, responsive HTML and CSS prototype with three linked pages**: Dashboard, Workouts, and Exercises.

The pages use sample data to demonstrate layout and visual design. Navigation between these three pages works; workout actions, search, filters, and editing controls are presentation-only. There is no backend, authentication, or saved user data yet.

## Pages

| Page | Content | File |
| :--- | :--- | :--- |
| **Dashboard** | Daily activity summary, planned workout, hydration, body weight, gym attendance, weekly chart, and recent workouts. | [index.html](index.html) |
| **Workouts** | Push, pull, leg, and full-body plans with muscle groups and exercise counts. | [workouts.html](workouts.html) |
| **Exercises** | Sample exercise library, muscle-group labels, and a bench-press detail panel with a torso illustration, equipment, notes, and example repetition ranges. | [exercises.html](exercises.html) |

The remaining sidebar sections are placeholders for future development.

## Visual design

The interface combines a compact layout with **skeuomorphic details**: raised buttons, inset search fields, textured navigation, and softly shaded panels. A shared theme keeps the three pages visually consistent.

| Design token | Color |
| :--- | :--- |
| Background | `#F3F8F7` |
| Surface | `#FFFFFF` |
| Text | `#183B45` |
| Accent | `#328A83` |
| Border | `#D5E7E4` |

Related teal shades distinguish sections and chart bars. The design also uses sentence-case headings, Lucide outline icons, compact navigation, responsive layouts, and subtle CSS transitions. Keyboard focus styles, descriptive chart text, and reduced-motion support are included; a full accessibility audit remains planned.

## Technology

| Layer | Implementation |
| :--- | :--- |
| Structure | HTML5 with inline SVG icons |
| Styling | CSS, Grid, Flexbox, and media queries |
| Shared theme | `theme.css`, loaded after base and page-specific styles |
| Icons | Lucide SVG paths, with attribution in `LUCIDE-LICENSE.txt` |
| Typography | Inter through Google Fonts; Arial and sans-serif fallbacks |
| Development and build | Vite with three HTML entry points |
| Application logic and database | Planned |

No JavaScript application framework is used in this phase. Vite and `lucide-static` are development dependencies; the interface itself is static HTML and CSS.

## Run locally

### Recommended: Vite

Install a current Node.js LTS release with npm. Clone the repository and enter the folder containing `package.json`:

```bash
git clone https://github.com/shah-ahmad/Gym-Tracker.git
cd Gym-Tracker
npm install
npm run dev
```

If you already have the project, open its **Gym-Tracker** folder in VS Code and run only `npm install` and `npm run dev` in the terminal.

Open the local URL printed by Vite. Use the sidebar to move between Dashboard, Workouts, and Exercises. Saved HTML and CSS changes refresh automatically. Stop the server with `Ctrl+C`.

> If npm reports that it cannot find `package.json`, the terminal is in the wrong folder. Enter the cloned `Gym-Tracker` directory first.

### Build and preview

```bash
npm run build
npm run preview
```

The build writes all three pages and their styles to `dist/`. The preview command serves that production build locally and prints its URL.

### Without npm

Open `index.html` directly in a browser, or use Python from the repository directory:

```bash
python -m http.server 8080 --bind 127.0.0.1
```

Visit [http://127.0.0.1:8080](http://127.0.0.1:8080). Google Fonts requires internet access; fallback fonts keep the pages usable offline.

## Repository structure

```text
Gym-Tracker/
├── index.html          # Dashboard
├── workouts.html       # Workout plans
├── exercises.html      # Exercise library and sample detail view
├── styles.css          # Base styles and dashboard layout
├── workouts.css        # Workout page layout
├── exercises.css       # Exercise page layout
├── theme.css           # Shared palette, material effects, and compact sizing
├── vite.config.mjs     # Multi-page production build configuration
├── package.json        # Development dependencies and npm commands
├── package-lock.json   # Locked dependency versions
├── .gitignore          # Excludes node_modules/ and dist/
├── LUCIDE-LICENSE.txt  # Icon license and attribution
├── README.md           # Project documentation
└── test.txt            # Initial Git workflow test file
```

## Current scope

**Implemented:** three linked pages, sample fitness content, responsive layouts, CSS chart rendering, shared visual styling, hover effects, keyboard focus styles, and a multi-page build.

**Not yet implemented:** workout creation or recording, exercise search and filtering, editing, live hydration or weight tracking, authentication, persistence, and statistics calculated from user records.

All displayed measurements, dates, counts, and session history are fixed examples. Typing into the search field does not filter the list. Action buttons do not create, modify, or save records.

## Development roadmap

- [x] Create the dashboard in HTML and CSS.
- [x] Add Workouts and Exercises pages with navigation links.
- [x] Apply a consistent teal theme and compact responsive styling.
- [x] Standardize icons with Lucide.
- [x] Configure Vite development and multi-page production builds.
- [ ] Implement search, filters, editing, and workout data entry.
- [ ] Build the remaining tracking and statistics pages.
- [ ] Introduce React for application state and reusable components.
- [ ] Develop FastAPI endpoints and connect PostgreSQL.
- [ ] Add authentication and user-specific records.
- [ ] Calculate activity statistics from saved data.
- [ ] Complete functional, cross-device, and accessibility testing.

React, FastAPI, and PostgreSQL are the intended future stack, not current dependencies.

---

<div align="center">

**GymTracker** · Academic project · Static interface prototype

</div>
