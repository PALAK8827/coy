# Coy – SDE Internship Assignment

A full-stack, responsive, and production-quality dating web application built for the **Coy SDE Internship Assignment**.

The application features smooth touch/pointer swipe gestures, persistent SQLite storage, mutual matching logic with strict privacy guarantees, clean modular architecture, and single-command startup.

---

## 🌟 Key Features

1. **Strict Two-Tab Navigation**:
   - **Home**: Completely blank as explicitly required by the assignment specification.
   - **Discover**: Houses all main application functionality (profile swiping feed, mutual match celebration modal, and the internal Matches view).
2. **Profile Discovery & Swipe Functionality**:
   - Displays **exactly ONE profile card at a time**.
   - **Natural Touch & Mouse Drag Gestures**: Mobile and desktop pointer gestures with real-time card rotation and dynamic `LIKE` (green) / `NOPE` (red) stamp opacity.
   - **Desktop Action Buttons**: Visible Like (Heart) and Pass (X) buttons, plus keyboard shortcuts (Left/Right Arrow keys, `I` for bio).
   - **Single-Swipe Enforcement**: Card locks during swipe transitions to prevent accidental duplicate actions.
   - **One-Time Feed Guarantee**: Once swiped (liked or passed), a profile is persistently saved and never shown again in the Discover feed.
   - **Empty State**: Beautiful empty-state screen when all profiles have been swiped, with options to view matches or reset the demo feed.
3. **Mutual Matching & Strict Privacy**:
   - Matches are created **ONLY** when both users have liked each other.
   - **Instant Match Celebration**: Displays an animated "It's a Match!" modal with confetti, user avatars, and quick actions.
   - **Privacy Enforcement**: One-sided incoming likes are **never exposed** in the feed or API. The Matches view displays **strictly mutual matches**.
4. **Persistent SQLite Database**:
   - Uses SQLite for zero-configuration, persistent relational storage.
   - Automatically initializes schema (`users`, `profiles`, `swipes`, `matches`, `incoming_likes`).
   - Automatically seeds **36 realistic mock profiles** with diverse names, ages, high-resolution portrait photos, colleges/cities, detailed bios, and interest tags.
   - Pre-seeds incoming likes from designated profiles (e.g., Sarah Jenkins, Priya Sharma, Elena Rostova, Marcus Chen) to demonstrate mutual matching.
   - Data persists across browser reloads and backend server restarts.
5. **One-Command Execution**:
   - `npm run dev` starts both the Node.js/Express backend and React/Vite frontend concurrently.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite | Lightning-fast HMR, JSX, modern hooks |
| **Styling** | Tailwind CSS | Mobile-first responsive design, custom animations |
| **Icons & Effects** | Lucide-React, Canvas-Confetti | Modern UI icons and celebratory match particle effects |
| **Backend** | Node.js, Express.js | Modular routes, controllers, and error handling |
| **Database** | SQLite3 | Persistent storage in `server/data/coy.sqlite` with WAL mode |
| **Process Manager** | Concurrently | Single-command root execution |

---

## 📁 Project Structure

```text
Coy/
├── package.json              # Root package with concurrently & workspace scripts
├── .gitignore                # Excludes node_modules, .env, dist, and SQLite databases
├── .env.example              # Environment variables template
├── README.md                 # Complete documentation & execution guide
│
├── server/                   # Backend (Node.js + Express.js + SQLite)
│   ├── package.json
│   ├── .env.example
│   ├── data/
│   │   └── coy.sqlite        # SQLite persistent database (created at runtime)
│   ├── src/
│   │   ├── app.js            # Express app configuration & middlewares
│   │   ├── server.js         # Entry point & server lifecycle
│   │   ├── config/
│   │   │   └── database.js   # SQLite connection & promisified helper methods
│   │   ├── controllers/
│   │   │   └── swipeController.js # Feed, swipe, matches, and stats handlers
│   │   ├── models/
│   │   │   └── db.js         # Relational database queries & formatting
│   │   ├── routes/
│   │   │   └── swipeRoutes.js# REST API route definitions (/feed, /swipe, /matches)
│   │   └── seed/
│   │       ├── seedData.js   # 36 realistic profiles & pre-liked user IDs
│   │       └── seeder.js     # Automatic database schema initialization & seeding
│   └── tests/
│       └── api.test.js       # Automated test suite covering all 13 required scenarios
│
└── client/                   # Frontend (React.js + Vite + Tailwind CSS)
    ├── package.json
    ├── vite.config.js        # Vite config with backend proxy integration
    ├── tailwind.config.js    # Tailwind color tokens & animations
    ├── postcss.config.js
    ├── index.html            # HTML entry point with Plus Jakarta Sans typography
    └── src/
        ├── main.jsx          # React DOM mounting
        ├── App.jsx           # Root layout with exactly 2 main tabs: Home & Discover
        ├── index.css         # Tailwind directives & smooth styling
        ├── api/
        │   └── client.js     # Frontend API client for /feed, /swipe, /matches
        ├── components/
        │   ├── Navbar.jsx    # Top nav with EXACTLY TWO tabs: Home and Discover
        │   ├── SwipeCard.jsx # Single card display, gesture touch/mouse drag & stamps
        │   ├── ActionButtons.jsx # Desktop & mobile Pass, Info, and Like buttons
        │   ├── MatchModal.jsx    # "It's a Match!" celebration modal with confetti
        │   ├── MatchesView.jsx   # Matches sub-view inside Discover (grid of mutual matches)
        │   └── EmptyFeed.jsx     # Attractive empty state when all profiles are swiped
        └── pages/
            ├── HomePage.jsx      # COMPLETELY BLANK as specified
            └── DiscoverPage.jsx  # Swiping feed, match modal, and matches sub-view
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher (Tested on Node.js v24.8.0)
- **npm**: v9.0.0 or higher

### Installation

Clone the repository and install all dependencies for root, server, and client with a single command:

```bash
npm run install:all
```

Alternatively, you can install them individually:
```bash
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

---

## ⚡ Running the Application

To start both the **Express backend** and **Vite frontend** concurrently:

```bash
npm run dev
```

Once running:
- **Frontend URL**: [http://localhost:5173](http://localhost:5173)
- **Backend URL**: [http://localhost:5000](http://localhost:5000)

---

## 🧪 Running Automated Tests

The project includes an automated test suite verifying all **13 required test scenarios**:

```bash
npm test
```

### Verified Test Scenarios

| # | Scenario | Status |
| :-: | :--- | :-: |
| 1 | At least 30 mock profiles are available in SQLite (36 seeded) | **PASSED** |
| 2 | `GET /feed` returns structured profiles correctly | **PASSED** |
| 3 | Already swiped profiles do not appear again in feed | **PASSED** |
| 4 | Right swipe successfully records a `like` in SQLite | **PASSED** |
| 5 | Left swipe successfully records a `pass` in SQLite | **PASSED** |
| 6 | A profile cannot be swiped multiple times (409 Conflict rejection) | **PASSED** |
| 7 | Mutual Likes correctly create a match record | **PASSED** |
| 8 | One-sided Likes do not create a match | **PASSED** |
| 9 | `GET /matches` displays only mutual matches | **PASSED** |
| 10 | One-sided incoming Likes remain strictly private (no data leakage) | **PASSED** |
| 11 | Swipe and match data persist in SQLite after browser reload | **PASSED** |
| 12 | Swipe and match data persist in SQLite after backend server restart | **PASSED** |
| 13 | Empty state appears when no profiles remain in the feed | **PASSED** |

---

## 📡 API Reference

### 1. `GET /feed`
Retrieves profiles that the demo user has not yet swiped on (excluding already liked and passed profiles).

**Response (200 OK):**
```json
{
  "success": true,
  "count": 36,
  "profiles": [
    {
      "id": 1,
      "name": "Sarah Jenkins",
      "age": 23,
      "photo_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330...",
      "bio": "Architecture student by day, amateur sourdough baker by night...",
      "city_or_college": "Columbia University",
      "interests": ["Architecture", "Baking", "Art Galleries", "Coffee Roasting", "Indie Rock"]
    }
  ]
}
```

### 2. `POST /swipe`
Submits a swipe action (`like` or `pass`) on a specific profile.

**Request Body:**
```json
{
  "profileId": 1,
  "action": "like"
}
```

**Response (200 OK - Mutual Match):**
```json
{
  "success": true,
  "matched": true,
  "action": "like",
  "profileId": 1,
  "match": {
    "id": 1,
    "name": "Sarah Jenkins",
    "age": 23,
    "photo_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330...",
    "bio": "Architecture student by day...",
    "city_or_college": "Columbia University",
    "interests": ["Architecture", "Baking", "Art Galleries"]
  },
  "message": "It's a match!"
}
```

**Response (200 OK - One-sided Like or Pass):**
```json
{
  "success": true,
  "matched": false,
  "action": "pass",
  "profileId": 4,
  "message": "Profile passed."
}
```

**Response (409 Conflict - Duplicate Swipe):**
```json
{
  "success": false,
  "message": "Profile 1 has already been swiped on."
}
```

### 3. `GET /matches`
Returns only mutual matches for the demo user. Never exposes one-sided incoming likes.

**Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "matches": [
    {
      "match_id": 1,
      "matched_at": "2026-11-20T10:15:30Z",
      "id": 1,
      "name": "Sarah Jenkins",
      "age": 23,
      "photo_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330...",
      "bio": "Architecture student by day...",
      "city_or_college": "Columbia University",
      "interests": ["Architecture", "Baking"]
    }
  ]
}
```

---

## 💡 How to Test the Demo in the Browser

1. Open [http://localhost:5173](http://localhost:5173).
2. Click **Home**: notice it is **completely blank**, strictly following instructions.
3. Click **Discover**:
   - The first profile displayed is **Sarah Jenkins** (who has pre-liked the demo user).
   - Click the green **Heart (Like)** button or drag the card to the right.
   - 🎉 An animated **"It's a Match!"** celebration modal pops up with confetti!
   - Click **"View in Matches"** to see Sarah Jenkins in your mutual matches view inside Discover.
   - Click the back arrow to return to swiping.
   - The next profile is **Alex Rivera** (who has not pre-liked the user). Swipe right on Alex; notice no match modal appears (one-sided like recorded silently).
   - Click the red **X (Pass)** button on the next profile; notice the profile is passed and does not appear again.
   - If you swipe through all profiles, you will see the **"You're All Caught Up!"** empty state, with a button to **Reset Swipes Demo** to test again whenever you want.

---

## 📦 Building for Production

To build the optimized frontend bundle:

```bash
npm run build
```

This generates production assets in `client/dist/`.

---

## 📤 GitHub Upload Instructions

To upload this complete project to GitHub:

1. **Initialize Git repository** (if not already initialized):
   ```bash
   git init
   ```
2. **Stage all files**:
   ```bash
   git add .
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Complete Coy SDE internship assignment: full-stack swiping and mutual matching app"
   ```
4. **Create a new repository** on GitHub (e.g. `coy-sde-assignment`).
5. **Link and push to GitHub**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

---

## 📄 License

This project is submitted for the Coy SDE Internship Assignment.
