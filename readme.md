## Rate Your Professor – MVP README

### Overview

**Rate Your Professor** is a lightweight web application that allows students to quickly **view, search, and rate professors**.  
This project is designed as a **single‑session MVP**: the goal is to ship a working prototype with minimal manual coding, using an AI agent guided by `agent.md`.

For this version:

- All data is stored **in memory** on the client (no real database).
- The app is built with **Next.js 14 (App Router)**, **React 18**, and **Tailwind CSS 3.x**.
- The UI follows an **Igloo.inc‑style** aesthetic: minimalist, dark mode by default, 12‑column grid layout.

---

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript or modern JavaScript (depending on project setup)
- **UI**: React 18 + Tailwind CSS 3.x
- **Optional visuals**: React Three Fiber / drei / three for subtle 3D accents
- **State & Data**:
  - In‑memory mock data for professors and their reviews.
  - Simple React hooks for local and page‑level state.

No backend or database is required to run this MVP.

---

### Project Structure (Docs Layer)

Inside the `project/` directory you will find the documentation that drives how the AI agent and developers work:

- `agent.md` – AI constraint dossier (how the agent should behave, pre‑commit checks, coding standards).
- `readme.md` – This file; how to run the project and grade it.
- `project.md` – Product scope and user stories for the MVP (what the app must do).
- `module.md` – Technical architecture and module breakdown (how the app is structured).
- `doc/` – Reserved for deeper architecture and design docs as the project evolves.

---

### Getting Started

#### Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **Package manager**: `npm` (bundled with Node) or `pnpm`/`yarn` if configured

#### Installation

From the repository root:

```bash
cd project
npm install
```

#### Running the Development Server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

You should see the Rate Your Professor landing page with a dark, grid‑based layout and a call‑to‑action to browse professors.

#### Production Build

To verify that the app builds for production:

```bash
npm run build
npm start
```

This will create an optimized build and run it on the same port (typically `http://localhost:3000`).

---

### MVP Functionality (Grading Checklist)

Use this section as a **quick grading guide**. A passing implementation should support all of the following flows.

- **Landing / Home Page**
  - Explains that this is a Rate Your Professor MVP.
  - Provides a clear way to navigate to the professor list (button or link).

- **Professor List Page**
  - Displays a list of professors from mock in‑memory data.
  - Shows key info per professor: name, department, and average rating.
  - Supports **search and/or filtering**:
    - Filter or search by name.
    - Filter by department and/or rating range.
  - Filtering/search should feel **instant** and should not reload the page.

- **Professor Detail Page**
  - Shows the selected professor’s name, department, and aggregate rating.
  - Lists existing reviews from mock data (rating value + optional comment).
  - Includes a **rating form**:
    - Rating input (e.g., 1–5 scale).
    - Optional text comment.
    - Submit button.
  - After submitting a rating:
    - The new rating appears in the list of reviews.
    - The average rating updates immediately.

- **Data Persistence**
  - Ratings are stored in client state only:
    - If you refresh the page, the data resets to the original mock dataset.
    - This is acceptable and expected for the MVP.

If all of the above user flows work without obvious UI or runtime errors, the MVP is considered successful.

---

### Architecture Summary

At a high level, the application works as follows:

```mermaid
flowchart LR
  user[User] --> browser[Next.js App]
  browser --> mockData[In-memory Mock Data]
  browser --> uiLayer[IglooUI Grid & Components]
```

- Pages and components are implemented using the Next.js App Router.
- Mock professor and review data lives in a small data module (e.g., `src/data/professors`).
- UI components (cards, lists, detail layouts) are laid out on a 12‑column grid with Tailwind utility classes.
- Simple aggregation utilities compute average ratings on the fly in **O(n)** over in‑memory arrays.

For more detail, see:

- `project.md` for **product scope and user stories**.
- `module.md` for **folder structure and module responsibilities**.

---

### Environment Variables & Zero‑Trust Notes

The current MVP **does not require any environment variables**.

However, to prepare for a future backend:

- A typical `.env.local` might eventually include variables like:

```bash
# Example only – not used in this MVP
DATABASE_URL=postgresql://user:password@host:5432/ratemyprofessor
```

- `.env*` files **must not** be committed to version control.
- Any future backend should follow a **Zero‑Trust** model:
  - Validate all inputs on the server.
  - Use parameterized queries or an ORM like Prisma.
  - Never trust client‑provided data without checks.

---

### Performance & Hardware Considerations

This project is intentionally designed to run well on modest hardware (e.g., a Raspberry Pi 5) by:

- Using lightweight, static assets and small mock datasets.
- Keeping search and filtering logic **O(n)** in the number of professors/reviews.
- Avoiding heavy animations and expensive per‑frame computations.
- Relying on Next.js and React’s built‑in optimizations rather than complex custom code.

If the UI ever feels sluggish on low‑power hardware, consider:

- Reducing any unnecessary re-renders.
- Avoiding large image assets or unnecessary third‑party scripts.

---

### Testing & Quality

Basic quality checks:

- **Linting**

```bash
npm run lint
```

- **Type checking** (if TypeScript is configured)

```bash
npm run typecheck
```

Automated tests are optional for this classroom MVP. If tests are added (e.g., using Jest or Playwright), they should be documented here with their run commands.

---

### License & Academic Use

This project is intended primarily for educational use in a classroom/lab setting.  
If you intend to reuse or extend it beyond coursework, consider adding an explicit license (e.g., MIT) at the repository root.

