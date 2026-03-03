# 20-Feature UI Suite – Implementation Status

All features adhere to the Igloo.inc aesthetic: strict 12-column grid, permanent dark mode, O(n) filtering where applicable. No Tailwind v4 or Next 16.

---

## Implemented

| # | Feature | Location | Notes |
|---|---------|----------|--------|
| 1 | **Cmd+K Command Palette** | Global (layout) | Keyboard-first overlay; fetches professors, O(n) filter by name/department; ↑↓ + Enter to open professor. |
| 2 | **Radar Stat Cards** | Professor detail | Pentagon chart: Clarity, Difficulty, Grading, Accessibility, Workload; derived from rating/difficulty. |
| 3 | **12-Column Masonry Directory** | Professors list | Grid already 12-col; filter bar + quick attribute tags; reflows without breaking dark aesthetic. |
| 4 | **O(n) Attribute Tags** | Professors list | Pills: High rated, Top tier, Computer Science, Mathematics, Physics, Biology, Clear; single-pass filter. |
| 5 | **Instanced / Virtualized Review List** | Professor detail | Fixed-height scroll; only visible window of reviews rendered (O(visible) DOM nodes). |
| 6 | **Bimodal Distribution Visualizer** | Professor detail | Histogram of 1–5 star counts; shows polarized vs uniform ratings. |
| 7 | **Professor Aura Score** | Professor detail | Single aggregated metric (0–99) from rating + difficulty; light payload. |
| 8 | **9-Route Dossier Breadcrumbs** | Professors + Professor detail | Home > Professors; Home > Professors > [Name]. Deep contextual nav. |
| 9 | **Auto-Truncating Text + Expand** | Review list | Comments >120 chars truncated with “Expand” toggle. |
| 10 | **Floating Quick-Action Button** | Global (layout) | Fixed + button; opens menu: Browse professors, Add rating (on detail), Home. |
| 11 | **Strict Dark-Mode Lock** | Global | No light toggle; palette remains high-contrast, low-emission. |
| 12 | **Twinkling Star Background** | Global (layout) | Full-screen fixed layer on all pages. |

---

## Not Implemented (MVP Scope / Stack)

| # | Feature | Reason |
|---|---------|--------|
| **Sentiment Sparklines** | No time-series data per professor; would need “last 5 semesters” backend. |
| **R3F Sentiment Tunneling** | WebGL/R3F v9 requires React 19; stack is React 18. Avoided to prevent dependency conflicts. |
| **Zero-Trust Anonymity Toggle** | Visual “encrypt avatar” is UX-only; no auth in MVP. Can be added as a visual switch later. |
| **Student ROI Calculator** | Requires credit-hour cost input and “value” formula; easy to add as a small widget later. |
| **Syllabus Diff Viewer** | No syllabus or year-over-year data in MVP. |
| **Cryptographic Verification Badges** | No student email auth in MVP. |
| **GLSL Noise Transitions** | Custom shaders not added; CSS transitions used instead for Pi 5 compatibility. |
| **Heatmap Matrix** | No “time of day” or “grade received” data. |
| **Peer Upvote Counters** | Can be added with in-memory state; deferred to keep scope minimal. |

---

## File Reference

- **Command Palette:** `src/components/dom/CommandPalette.tsx`
- **Radar Stat Card:** `src/components/ui/RadarStatCard.tsx`
- **Virtualized Review List:** `src/components/professors/VirtualizedReviewList.tsx`
- **Bimodal Distribution:** `src/components/ui/BimodalDistribution.tsx`
- **Breadcrumbs:** `src/components/dom/Breadcrumbs.tsx`
- **Floating Quick-Action:** `src/components/dom/FloatingQuickAction.tsx`
- **Attribute tags:** `src/components/professors/ProfessorList.tsx` (Quick: pills)
- **Aura + Radar + Bimodal:** `src/components/professors/ProfessorDetail.tsx`

All new components are optimized for Raspberry Pi 5–level devices: no heavy WebGL, O(n) filters, and virtualized lists to avoid DOM bloat.
