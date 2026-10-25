<div align="center">

# GymTracker

### Plan your training. Record your progress.

A responsive fitness application with eleven connected pages, working forms, and browser-local storage.

![Status](https://img.shields.io/badge/Status-Functional_Local_App-328A83?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-183B45?style=flat-square)
![Vite](https://img.shields.io/badge/Development-Vite-328A83?style=flat-square)

[Features](#features) · [Muscle maps](#exercise-details-and-muscle-maps) · [Run locally](#run-locally) · [Data and limitations](#data-and-limitations) · [Validation](#validation)

</div>

---

## Overview

GymTracker is an academic web application for workout planning, session tracking, hydration, body weight, and fitness goals. It uses HTML, CSS, and vanilla JavaScript with Vite for development and builds.

The original static interface now has working forms and controls. Records persist in the current browser, and the dashboard, goals, history, and statistics share the same data. Four editable starter plans and thirteen exercises are included; session, water, and weight logs start empty.

## Features

| Section | Working behavior |
| :--- | :--- |
| **Dashboard** | Current weight, daily hydration, weekly session count, previous-week navigation, recent sessions, and links to tracking pages. |
| **Gym sessions** | Choose a plan, start a timer, resume after refresh, edit completed sets/reps/load, skip exercises, complete or cancel a session. |
| **Workout plans** | Create, edit, delete, and start plans; add or remove exercises and configure sets, reps, and load. |
| **Exercises** | Search, filter, add or edit exercises, and open details with front/back muscle maps, primary and supporting muscles, equipment, and notes. |
| **Water tracking** | Add and delete intake records, change the daily target, and view live progress. |
| **Weight tracking** | Record dated measurements and notes, delete records, and view changes and a trend chart. |
| **Statistics** | Weekly workout counts, training time, volume, and exercise-load progress calculated from saved sessions. |
| **Workout history** | Browse completed sessions and open their exercise details. |
| **Fitness goals** | Save workout, hydration, and weight targets; compare them with recorded activity. |
| **My profile** | Save a display name, optional email, and weight/water unit preferences. |
| **Settings** | Save theme, density, week start, time format, and in-app reminder preferences; export JSON and reset local data. |

The profile control opens My profile. The notification bell shows current workout and water-goal reminders and the weekly activity summary, according to saved preferences.

## Exercise details and muscle maps

Selecting an exercise updates its detail panel and body illustrations. On smaller screens, the selected detail view scrolls into view automatically.

- **Red:** primary muscles targeted by the exercise.
- **Peach:** supporting muscles.
- **Neutral:** other regions of the body.

Both front and back views are shown so posterior muscles, such as the lats and triceps, are visible. These are schematic illustrations; actual emphasis varies with technique and equipment.

The starter library contains these thirteen exercise mappings:

| Exercise | Primary muscles shown |
| :--- | :--- |
| Bench press | Pectoralis major |
| Incline dumbbell press | Upper pectoralis major |
| Push-up | Pectoralis major |
| Pull-up | Latissimus dorsi |
| Lat pulldown | Latissimus dorsi |
| Barbell row | Lats, rhomboids, middle trapezius |
| Shoulder press | Anterior and middle deltoids |
| Lateral raise | Middle deltoids |
| Biceps curl | Biceps brachii |
| Triceps pushdown | Triceps brachii |
| Squat | Quadriceps and gluteus maximus |
| Leg press | Quadriceps and gluteus maximus |
| Plank | Abdominal region, representing rectus and transverse abdominis |

Built-in descriptions and muscle mappings are defined in `muscles.js`. Matching uses the exercise name. Custom or renamed exercises without a recognized name use a general map for their selected muscle group. Saved descriptions, equipment, secondary-muscle text, and notes take precedence over the corresponding built-in text when provided; editing those fields does not redraw the anatomical mapping.

## Typical workflow

1. Browse **Exercises** and inspect the target-muscle diagrams.
2. Create or edit a **Workout plan**, choosing exercises, sets, reps, and load.
3. Start a **Gym session**, record completed work, then select **Mark complete**.
4. Review the saved session in **Workout history** and its totals in **Statistics**.
5. Add water and weight measurements, then check progress against **Fitness goals**.

## Data and limitations

- **Storage:** `localStorage`, under `gymtracker.v1`. Records persist after refresh and are shared by pages on the same browser origin. Other open tabs update when saved data changes.
- **Origins matter:** different ports or hosts have separate storage. For example, `localhost:5173` and `127.0.0.1:8081` do not share records. Use the same address for everyday use.
- **No backend yet:** there is no server account, cloud synchronization, sign-in, password change, or password storage. The profile page explains this instead of presenting a nonfunctional password form.
- **Reminders:** shown inside the app through the notification bell. There are no background, push, or email notifications.
- **Units:** body weight can display in kg or lb, and water in ml or fl oz. Workout-plan and session loads are explicitly entered in kg; training volume is shown in kg.
- **Session volume:** sets × reps per set × load. Each exercise row represents equal reps and load across its sets. Body-weight exercises recorded at zero load contribute zero external-load volume.
- **Dates:** daily and weekly totals follow the device's local calendar and the saved week-start preference.
- **Export:** Settings downloads a JSON copy of local records. An import interface is not implemented yet. Clearing browser storage or resetting the app removes local records.
- **Validation:** required fields, numeric bounds, duplicate exercise names, and future measurement/session dates are checked. Destructive actions require confirmation in the interface.

## Visual design

The compact interface retains skeuomorphic details: raised buttons, inset fields, textured navigation, and softly shaded surfaces. The shared palette is:

| Token | Color |
| :--- | :--- |
| Background | `#F3F8F7` |
| Surface | `#FFFFFF` |
| Text | `#183B45` |
| Accent | `#328A83` |
| Border | `#D5E7E4` |

Related teal shades differentiate charts and sections. Exercise categories have distinct badge and filter colors. Icons use Lucide; typography uses Inter through Google Fonts with local fallbacks. Keyboard focus indicators, native dialogs, form labels, and reduced-motion support are included.

## Run locally

Install Node.js with npm, then run:

```bash
git clone https://github.com/shah-ahmad/Gym-Tracker.git
cd Gym-Tracker
npm install
npm run dev
```

Open the URL printed in the terminal. If the repository is already cloned, open the **Gym-Tracker** folder in VS Code and run `npm install` and `npm run dev` there.

> An npm error saying `package.json` cannot be found means the terminal is in the wrong folder. Enter the cloned `Gym-Tracker` directory first.

Use a local HTTP server rather than opening the HTML files directly: JavaScript modules require an HTTP origin. As an alternative to Vite:

```bash
python -m http.server 8080 --bind 127.0.0.1
```

Visit [http://127.0.0.1:8080](http://127.0.0.1:8080). Stop either server with `Ctrl+C`. Google Fonts needs an internet connection; the interface uses fallback fonts offline.

### Production build

```bash
npm run build
npm run preview
```

Vite builds all eleven HTML entry points and shared assets into `dist/`. The preview command prints the address of the built application.

## Project structure

```text
Gym-Tracker/
├── index.html          # Dashboard shell
├── workouts.html       # Workout-plan shell
├── exercises.html      # Exercise-library shell
├── gym-sessions.html   # Session shell
├── water.html          # Hydration shell
├── weight.html         # Body-weight shell
├── statistics.html     # Statistics shell
├── history.html        # Session-history shell
├── goals.html          # Fitness-goal shell
├── profile.html        # Profile shell
├── settings.html       # Settings shell
├── app.js              # Page rendering, forms, dialogs, and interactions
├── model.js            # State, persistence, validation, and calculations
├── muscles.js          # Exercise anatomy mappings and SVG muscle diagrams
├── model.test.mjs      # Automated model tests
├── app.css             # Interactive controls and appearance preferences
├── features.css        # Shared forms, tables, and tracking layouts
├── theme.css           # Shared color, material, and sizing rules
├── styles.css          # Base styles
├── workouts.css        # Workout layout styles
├── exercises.css       # Exercise layout styles
├── vite.config.mjs     # Eleven-page build configuration
├── package.json        # Scripts and dependencies
├── package-lock.json   # Locked dependencies
├── LUCIDE-LICENSE.txt  # Icon license
├── test.txt            # Initial repository workflow test file
└── README.md
```

## Validation

```bash
npm test
npm run build
```

Model tests cover session snapshots, volume calculations, empty-session rejection, storage round trips, numeric validation, and calendar-week boundaries. Browser checks cover hydration persistence, plan creation, session completion and statistics, exercise search and creation, weight logging, goals, unit conversion, and saved appearance preferences. Exercise selection has also been checked in the browser to confirm that the muscle details and highlighted regions update together.

## Next steps

- Add a validated JSON import workflow.
- Support different reps and loads for individual sets.
- Add a backend, authentication, and cloud synchronization.
- Complete broader accessibility and device testing.

React, FastAPI, and PostgreSQL remain possible future technologies; the current implementation uses vanilla JavaScript and local browser storage.

---

<div align="center">

**GymTracker** · Academic project · Local fitness application

</div>
