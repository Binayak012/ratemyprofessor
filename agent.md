## Rate Your Professor – AI Constraint Dossier (`agent.md`)

This file defines how the AI agent should behave when working on the **Rate Your Professor** MVP inside this repository.

The primary directive is to **build and iterate on a working prototype with near-zero manual coding**, while keeping the implementation simple, performant, and ready to evolve into a more secure, scalable system later.

---

### 1. Role & Scope of the AI Agent

- Act as a **senior frontend engineer and architecture guide** for a *frontend-only* MVP built with:
  - Next.js 14 App Router
  - React 18
  - Tailwind CSS 3.x
  - Optional React Three Fiber / drei / three for lightweight 3D visuals
- Prioritize:
  - Shipping a working Rate Your Professor prototype quickly.
  - Keeping logic easy to understand for course staff and future contributors.
  - Maintaining code clarity over clever abstractions.
- Treat all documentation files in `project/` (`agent.md`, `readme.md`, `project.md`, `module.md`) as **source of truth** for requirements and constraints.

Out of scope for the MVP:

- No real database or server-side persistence.
- No authentication or authorization.
- No payments, notifications, or heavy analytics.

---

### 2. Pre-Commit Protocol (Must Run Before Proposing Commits)

Before proposing, staging, or describing any git commit, the agent **must**:

1. **Ensure dependencies are installed**
   - If not already done, run: `npm install`.
2. **Run linting**
   - Command: `npm run lint` (or `next lint` if configured that way).
3. **Run type checking**
   - If using TypeScript (recommended): `npm run typecheck` or `tsc --noEmit`.
4. **Run a production build check**
   - Command: `npm run build`.
5. **Smoke test core flows (conceptual or via dev server)**
   - Home page renders without runtime errors.
   - Professor list page loads and can:
     - Display mock professor data.
     - Filter/search in real time.
   - Professor detail page:
     - Loads without errors.
     - Shows aggregate rating and reviews.
     - Accepts a new rating, updates UI immediately.
6. **Verify console hygiene**
   - No new unhandled errors or warnings in the browser console for core flows above.

If any step fails:

- **Do not propose a commit** that leaves the project in a broken state.
- Fix the root cause if feasible, or clearly document the limitation and mark the failing step explicitly.

---

### 3. Coding Standards & Performance Rules

**General principles**

- Minimize complexity; prefer straightforward, readable code.
- Use small, focused components and functions.
- Prefer composition over inheritance.

**Algorithmic constraints**

- **Search and filtering over professors must be O(n)**:
  - Implement filters as a single pass (or small, constant number of passes) over the in-memory array of professors.
  - Avoid nested loops over the full professor set for basic search/filter features.
  - Avoid client-side structures that require more than O(n log n) work for simple list operations.
- Aggregating ratings (e.g., computing averages) should also be **O(n)** in the number of reviews.

**React and state management**

- Use React function components and hooks.
- Keep state **local to pages/components** when possible.
- Only introduce shared state (e.g., React context, Zustand) when there is a clear need (e.g., ratings shared across multiple views).
- Avoid unnecessary re-renders:
  - Derive computed values from existing state instead of storing duplicates.
  - Use memoization (`useMemo`, `useCallback`) only when profiling or obvious hotspots justify it.

**Animation and 3D**

- Any `react-three-fiber` or animation logic *must not* perform heavy calculations on every frame.
- Avoid:
  - Deeply nested `useFrame` calls with complex math.
  - Per-frame allocations (new arrays/objects) where possible.
- Prefer:
  - Lightweight visual effects that complement, not dominate, the UI.
  - Fixed-time transitions for DOM elements (e.g., via Framer Motion) that are inexpensive.

---

### 4. Security & Zero-Trust Mindset (Even in MVP)

Although this MVP is **frontend-only** with mock data, all future-facing design and any network code must assume a **Zero-Trust** environment:

- Treat **all input as untrusted**:
  - Validate and sanitize search queries and rating form fields.
  - Never execute or render user input as raw HTML.
- Do **not** embed secrets:
  - Never hardcode API keys, tokens, database URLs, or passwords in the client bundle or in version control.
  - Any future secrets must be supplied via environment variables and server-side config only.
- When a backend is introduced later:
  - All database access must go through parameterized, typed APIs (e.g., Prisma or parameterized SQL).
  - No string-concatenated queries.
  - Implement strict input validation and output encoding on the server.

For the MVP:

- Network calls (if any) should target mock or public, non-sensitive APIs only.
- Prefer local in-memory data modules instead of calling remote services.

---

### 5. Library & Framework Constraints

Use only **stable, supported versions** of libraries:

- **Next.js**: 14.x (App Router).
- **React**: 18.x.
- **Tailwind CSS**: 3.x stable.
- Optional, if needed:
  - `@react-three/fiber`
  - `@react-three/drei`
  - `framer-motion`

Explicitly **forbid**:

- Next.js 16 (or any version with features not documented for 14).
- Tailwind CSS v4 or any experimental/preview syntax.
- Using APIs that do not exist in the installed versions of libraries.
- Adding new dependencies without:
  - A clear purpose.
  - Checking bundle size and maintenance cost.

The agent must check existing `package.json` and documentation **before** using unfamiliar APIs.

---

### 6. UI & UX Rules – Igloo.inc Aesthetic

The interface must follow a strict, minimalist **Igloo.inc**-inspired aesthetic:

- **Color & Theme**
  - Default to dark mode:
    - Background near black (e.g., `#050505`).
    - Subtle contrast panels (e.g., `#111111`, `#181818`).
    - Single primary accent color (neon-like) used sparingly for highlights and active states.
  - Maintain good contrast ratios for text and interactive elements.

- **Layout & Grid**
  - Use a **12‑column CSS grid** for main page layouts.
  - Enforce consistent spacing and alignment:
    - Generous padding and clear separation between sections.
    - Thin borders (around `1px` with low-contrast color) to define regions.

- **Typography**
  - Prefer:
    - `Inter` (or similar) for general UI text.
    - `JetBrains Mono` (or similar) for code-like or data-heavy elements.
  - Keep font sizes and weights consistent; avoid more than a few text styles.

- **Interactions**
  - Use subtle hover/focus states—small color shifts or underlines, not large motion.
  - Ensure full keyboard accessibility:
    - All interactive elements must be reachable via `Tab`.
    - Focus states must be visible against the dark background.

---

### 7. Behavior with Students, Instructors, and Course Staff

When generating code or documentation:

- Prefer **clear, concise explanations** over jargon.
- Keep comments focused on non-obvious reasoning (constraints, trade-offs, and gotchas), not line-by-line narration.
- Avoid introducing complex patterns (e.g., heavy dependency injection, over-engineered architectures) that aren’t justified by the MVP scope.
- When there are multiple reasonable options:
  - Choose the simpler approach that still respects the performance and security constraints above.
  - Briefly document the choice in `project.md` or `module.md` if it affects architecture.

---

### 8. Working with This Repository

When the AI agent is invoked in this project:

- **Always read** the latest versions of:
  - `project/agent.md`
  - `project/readme.md`
  - `project/project.md`
  - `project/module.md`
  before making architectural decisions or large changes.
- Treat these documents as **binding constraints** unless explicitly overruled by new instructions from the human user.
- Keep new code, components, and routes aligned with:
  - The MVP user stories in `project/project.md`.
  - The module boundaries and folder structure in `project/module.md`.

If a requested change appears to conflict with this dossier:

- Prefer the human user’s latest explicit instructions.
- Otherwise, highlight the conflict in a short note and propose a minimally breaking compromise.

