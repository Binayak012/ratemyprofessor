## Rate Your Professor – Project Scope (`project.md`)

### 1. Problem Statement

Students often choose classes with limited information about the teaching style, difficulty, and overall experience of different professors.  
Existing review platforms can be noisy, slow, or overloaded with features that are unnecessary in a classroom setting.

This project aims to build a **focused, fast Rate Your Professor MVP** that:

- Allows students to quickly see which professors might be a good fit.
- Demonstrates a complete, end‑to‑end user flow from browsing to submitting a rating.
- Can be implemented in a single lab or class session with heavy assistance from an AI agent.

---

### 2. Goals for the MVP

The MVP is intentionally small and achievable:

- **Time‑boxed**: It should be possible to reach a working prototype within a single class/lab period.
- **AI‑assisted**: The AI agent (see `agent.md`) handles most of the coding and boilerplate.
- **Understandable**: Course staff and students should be able to read the code and documentation quickly.
- **Extensible**: The foundations should be clean enough to grow into a more serious product later.

Success for this MVP is defined by:

- The app runs locally without errors.
- Core user stories (below) can be completed smoothly.
- The UI feels responsive and visually coherent on common hardware.

---

### 3. User Stories (MVP)

#### Student – Discovery

- **Browse professors**
  - As a student, I can see a **list of professors** with their names, departments, and average ratings.

- **Search / filter**
  - As a student, I can **search** for a professor by name.
  - As a student, I can **filter** professors by department and/or rating so that I can quickly find strong options.

#### Student – Evaluation

- **View professor detail**
  - As a student, I can click on a professor to view a **detail page** that shows:
    - Their basic info (name, department, maybe courses taught).
    - Their **average rating**.
    - A list of existing reviews (rating + optional comment) from mock data.

#### Student – Contribution

- **Submit a rating**
  - As a student, I can submit a **new rating** for a professor by:
    - Choosing a rating value (e.g., 1–5).
    - Optionally adding a short text comment.
    - Submitting the form.
  - After I submit:
    - My review appears in the list.
    - The professor’s average rating updates immediately.

#### Classroom / Instructor

- **Demonstrate AI‑assisted development**
  - As an instructor, I can show students a concrete example of using an AI agent to:
    - Plan architecture.
    - Generate code aligned with clear constraints.
    - Iterate quickly while preserving quality.

---

### 4. Out of Scope for the MVP

To keep the project achievable and focused, the following are **explicitly out of scope** for this version:

- User accounts, login, or authentication.
- Persistent storage (no real database, no external APIs storing data).
- Administrative dashboards or moderation tools.
- Real‑time updates, notifications, or websockets.
- Full mobile‑first design system beyond reasonable responsiveness.
- Detailed analytics, exports, or reporting.

These items may be revisited in future phases, but they are **not required** for grading the MVP.

---

### 5. Future Phases & Scalability

While the MVP is frontend‑only, it is designed so that we can evolve it later without a full rewrite.

Potential future phases include:

- **Phase 2 – Persistence & Accounts**
  - Add a **PostgreSQL** database with tables such as:
    - `professors` – core professor records.
    - `students` – optional user accounts.
    - `reviews` – ratings and comments, linked to professors (and optionally students).
  - Implement a simple authentication flow (student login).
  - Store ratings persistently and load them from the backend.

- **Phase 3 – Advanced Filtering & Analytics**
  - Add filters by:
    - Course name/ID.
    - Term/semester.
    - Difficulty or workload.
  - Provide analytics such as:
    - Highest‑rated professors by department.
    - Trends over time.

- **Phase 4 – Zero‑Trust, Production‑Grade Backend**
  - Enforce strict **Zero‑Trust** principles:
    - Validate and sanitize all inputs on the server.
    - Use parameterized queries or an ORM to avoid injection.
    - Implement rate limiting and role‑based access control.
  - Harden the system for deployment on low‑power hardware (e.g., Raspberry Pi 5) or small cloud instances.

---

### 6. Constraints & Non‑Functional Requirements

To keep the MVP aligned with the course goals and future scalability:

- **Performance**
  - Search and filter operations should be **O(n)** in the number of professors/reviews.
  - The UI should remain responsive on modest hardware (e.g., Raspberry Pi 5).

- **Simplicity**
  - The codebase should be approachable for students who are new to Next.js and React.
  - Avoid architectural patterns that are unnecessary at this scale.

- **Aesthetics**
  - Follow the **Igloo.inc**‑style dark UI:
    - Dark background, bright accent, minimalist layout.
    - 12‑column grid with clear, thin boundaries between sections.

- **AI Collaboration**
  - `agent.md` defines how the AI should behave when editing code and docs.
  - This document (`project.md`) is the **product source of truth**: if a feature is not listed here, it is considered optional.

---

### 7. Definition of Done (MVP)

The Rate Your Professor MVP is considered **done** when:

1. The app starts successfully with `npm run dev` (or equivalent).
2. The landing page, professor list, and professor detail flows all work without runtime errors.
3. A new rating can be submitted and immediately reflected in the UI.
4. The grading checklist in `readme.md` can be completed successfully.
5. Documentation (`agent.md`, `readme.md`, `project.md`, `module.md`) is present and consistent.

