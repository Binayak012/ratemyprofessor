## Rate Your Professor – Technical Architecture Blueprint (`module.md`)

This document explains **how** the Rate Your Professor MVP is structured: modules, folders, and the key data and UI flows.  
It is intended for developers and the AI agent working on this codebase.

The current implementation is **frontend‑only**, using in‑memory data and the Next.js App Router.

---

### 1. High‑Level Architecture

At a high level, the app is a React/Next.js SPA with a small set of pages:

- Landing page – introduces the app and links to the professor list.
- Professor list page – shows all professors with search/filter.
- Professor detail page – shows one professor, their reviews, and a rating form.

Data for professors and reviews is stored in small **mock data modules** and manipulated via simple **O(n)** helper functions.

---

### 2. Suggested Folder Structure

The exact structure may vary slightly based on how the project is initialized, but the target layout is:

```text
project/
  app/
    layout.tsx              # Global layout, dark theme, grid shell
    page.tsx                # Landing page
    professors/
      page.tsx              # Professors list page
      [id]/
        page.tsx            # Professor detail page

  src/
    data/
      professors.ts         # Mock data for professors and reviews
    lib/
      rating.ts             # Helper functions for aggregating ratings
      filter.ts             # Helper functions for search/filter (O(n))
    components/
      layout/
        Shell.tsx           # Outer grid shell and navigation
      professors/
        ProfessorCard.tsx   # Card for a professor in the list
        ProfessorList.tsx   # List + search/filter controls
        ProfessorDetail.tsx # Detail view for one professor
        RatingForm.tsx      # Rating submission form
      ui/
        Button.tsx          # Basic button styled for Igloo.inc theme
        Input.tsx           # Text input
        Select.tsx          # Dropdown/select
        Badge.tsx           # Small label for tags/departments

  project/
    agent.md
    readme.md
    project.md
    module.md
    doc/
```

The **AI agent should keep new code within these boundaries** unless there is a strong reason to refactor.

---

### 3. Data Modules

#### `src/data/professors.ts`

Responsibility:

- Define the **static, in‑memory dataset** for the MVP.
- Provide TypeScript types (or JSDoc types) that describe professors and reviews.

Example shape:

```ts
export type Review = {
  id: string;
  professorId: string;
  rating: number;      // 1–5
  comment?: string;
  createdAt: string;
};

export type Professor = {
  id: string;
  name: string;
  department: string;
  averageRating: number;  // derived on load or via helper
};
```

The module should export:

- `professors: Professor[]`
- `reviews: Review[]`

No network or database calls should be made from this module in the MVP.

---

### 4. Utility Modules

#### `src/lib/rating.ts`

Responsibility:

- Provide small, pure functions for working with ratings and reviews.

Core functions (all **O(n)** in the number of reviews passed in):

- `calculateAverageRating(reviews: Review[]): number`
  - Computes the average rating for a set of reviews.
- `getProfessorReviews(allReviews: Review[], professorId: string): Review[]`
  - Filters reviews for a specific professor.

These utilities should:

- Avoid side‑effects.
- Be easy to test in isolation.

#### `src/lib/filter.ts`

Responsibility:

- Implement **O(n)** filtering and search for professors.

Example functions:

- `filterProfessors(professors, { query, department, minRating })`
  - Runs a single pass through the `professors` array and:
    - Matches name against `query` (case‑insensitive substring).
    - Matches department if provided.
    - Filters by minimum rating if provided.

Constraints:

- Do not use nested loops over the full dataset for standard filters.
- Keep logic readable; optimize further only if needed.

---

### 5. UI Modules & Components

#### Layout & Shell

- `app/layout.tsx`
  - Sets up the **global Igloo.inc dark theme**:
    - Dark background (`#050505` or similar).
    - 12‑column grid for main content.
    - Consistent typography and spacing.
  - Provides any shared navigation/header used across pages.

- `src/components/layout/Shell.tsx`
  - Optional wrapper component that:
    - Implements the grid structure with Tailwind classes.
    - Applies standard paddings, borders, and responsive breakpoints.

#### Professors UI

- `src/components/professors/ProfessorCard.tsx`
  - Displays a single professor in the list:
    - Name, department, average rating.
    - Link or button to open the detail page.

- `src/components/professors/ProfessorList.tsx`
  - Receives the full professors array as a prop.
  - Includes search input and filter controls.
  - Uses `filterProfessors` to compute the visible list.
  - Renders a grid of `ProfessorCard` components.

- `src/components/professors/ProfessorDetail.tsx`
  - Receives the current professor and their reviews.
  - Uses `calculateAverageRating` to compute aggregate metrics.
  - Displays the professor’s metadata and a list of reviews.

- `src/components/professors/RatingForm.tsx`
  - Handles controlled form inputs for rating + optional comment.
  - Performs basic client‑side validation.
  - Calls a callback to add the new review to state when submitted.

#### Generic UI Components

- `src/components/ui/Button.tsx`, `Input.tsx`, `Select.tsx`, `Badge.tsx`, etc.
  - Encapsulate styling for reusable primitives.
  - Use Tailwind classes that:
    - Respect the dark theme.
    - Provide consistent focus and hover states.

---

### 6. Pages & Routing (Next.js App Router)

#### `app/page.tsx` – Landing Page

Responsibilities:

- Introduce the Rate Your Professor MVP.
- Briefly explain what the user can do (browse, search, rate).
- Provide a clear navigation element (button/link) to `/professors`.

#### `app/professors/page.tsx` – Professors List

Responsibilities:

- Import `professors` from `src/data/professors`.
- Use state to track search/filter criteria.
- Pass data and filters into `ProfessorList`.
- Ensure all filtering/search is **client‑side** and **O(n)**.

#### `app/professors/[id]/page.tsx` – Professor Detail

Responsibilities:

- Read `id` from the route parameters.
- Find the corresponding professor from `professors`.
- Use `getProfessorReviews` to fetch that professor’s reviews.
- Use React state to store the current list of reviews so that new ratings can be added.
- Render `ProfessorDetail` and `RatingForm`.

If a professor is not found for a given `id`, show a simple 404‑style message.

---

### 7. Igloo.inc UI Design System

Implementation details of the design system should live primarily in:

- `tailwind.config` – color palette, font families, and spacing scale.
- Shared UI components in `src/components/ui/`.

Guiding rules:

- **Colors**
  - Background: near‑black.
  - Surfaces: subtle dark grays.
  - Accent: one bright neon color for primary actions and highlights.

- **Grid**
  - The main content area uses a **12‑column grid**:
    - On large screens, professor cards can span 3–4 columns each.
    - On small screens, collapse to 1–2 columns.

- **Typography**
  - Use `Inter` (or similar) for body and headings.
  - Use `JetBrains Mono` for code, data labels, or certain UI microcopy.

The AI agent should reuse existing components and utility classes **before** introducing new styles.

---

### 8. Future Backend Architecture (Design Placeholder)

Although not implemented in this MVP, the long‑term architecture anticipates a small backend service.

Conceptual components:

- **Database (PostgreSQL)**
  - Tables: `professors`, `students`, `reviews`.
  - Enforced foreign keys between reviews and professors (and optionally students).

- **API Layer**
  - Next.js Route Handlers or a separate API service:
    - `GET /api/professors`
    - `GET /api/professors/:id`
    - `GET /api/professors/:id/reviews`
    - `POST /api/professors/:id/reviews`
  - All endpoints follow Zero‑Trust principles:
    - Validate input.
    - Use parameterized queries.
    - Enforce authentication/authorization where appropriate.

- **Threat Model (High‑Level)**
  - Protect against:
    - SQL injection via parameterized queries.
    - Cross‑site scripting by encoding/escaping user content.
    - Abuse via rate limiting and input length constraints.

These backend details are **design notes only** and do not need to be implemented for the MVP.

---

### 9. Summary

- This blueprint defines the **modules and boundaries** for the Rate Your Professor MVP.
- The AI agent and human contributors should:
  - Keep logic in small, well‑named modules.
  - Use utility functions for data operations (ratings, filters) with **O(n)** complexity.
  - Maintain the Igloo.inc dark aesthetic and 12‑column grid layout.
- When extending the project, update this document to reflect new modules or refactors so that future work remains coherent.

