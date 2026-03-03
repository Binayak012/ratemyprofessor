# 10 Additional Features to Make Rate My Professor Better

Use this document to approve which features you want implemented. Each feature includes scope, user benefit, and technical notes.

---

## 1. **Difficulty rating (1–5) with reflective stars**

- **What:** Each review can include a “difficulty” score (1 = easy, 5 = very hard). Display quality and difficulty as star rows, with a subtle “reflection” effect under the stars (mirrored, faded) for a polished look.
- **Where:** Professor cards (list), professor detail (header + each review), and the “Add review” form.
- **User benefit:** Students can see at a glance how hard a professor’s course is, not just how good they are.
- **Technical:** Add `difficulty?: number` to `Review`; optional in form; API accepts/returns it; aggregate “average difficulty” per professor (O(n)).

---

## 2. **“Would take again” yes/no**

- **What:** In each review, a simple “Would take again?” (Yes/No). Show on cards and detail as a percentage (e.g. “92% would take again”).
- **User benefit:** Quick signal of overall satisfaction beyond the 1–5 rating.
- **Technical:** Add `wouldTakeAgain?: boolean` to `Review`; optional in form; API and aggregates as above.

---

## 3. **Filter by university**

- **What:** On the professors list page, a dropdown (or multi-select) to filter by university. Works together with existing search and department filter.
- **User benefit:** Students at one school can focus on their campus.
- **Technical:** Extend `ProfessorFilter` with `universityId`; single O(n) pass in `filterProfessors`; reuse existing `universities` list.

---

## 4. **Sort options (rating, difficulty, name, review count)**

- **What:** Sort professors by: average rating (high/low), average difficulty (easy first / hard first), name A–Z, or number of reviews (most reviewed first).
- **User benefit:** Find “best rated” or “easiest” or “most reviewed” quickly.
- **Technical:** Client-side sort on already-filtered list; O(n log n) with a clear comparator; no new API.

---

## 5. **Course / class tag per professor**

- **What:** Each professor has optional “courses” (e.g. “CS 101”, “MATH 301”). Shown as small tags on the card and detail; filter list by course.
- **User benefit:** Match professors to specific classes students are signing up for.
- **Technical:** `Professor` gets `courseIds: string[]` and a `courses` array (id, name); filters get `courseId`; still O(n) filter.

---

## 6. **“Top rated” and “Most reviewed” highlights on home**

- **What:** On the home page, two small sections: “Top rated this term” and “Most reviewed” with 3–5 professor cards each (links to detail).
- **User benefit:** Quick discovery without opening the full list.
- **Technical:** Server component fetches `/api/professors`, sorts once for each metric, slices top 3–5; reuse `ProfessorCard` or a compact variant.

---

## 7. **Search by course code or keyword in comments**

- **What:** Search box can match professor name (existing), department (existing), or course code. Optionally: “Search in comments” to find reviews that mention a word (e.g. “exam”, “group project”).
- **User benefit:** Find professors who teach a certain class or discuss certain topics.
- **Technical:** Name/department/course: extend current O(n) filter. Comment search: optional second pass over review comments (still O(n) total if data is in memory); for large data, would move to backend search later.

---

## 8. **Export professor list (CSV)**

- **What:** Button on professors list: “Export to CSV”. Downloads a file with columns: name, department, university, average rating, average difficulty, review count, “would take again %”.
- **User benefit:** Use data in spreadsheets or for personal notes.
- **Technical:** Client-side: build CSV string from current (filtered) list and trigger download; no new API.

---

## 9. **Dark/light theme toggle**

- **What:** A toggle in the header to switch between dark (current) and light theme. Preference stored in `localStorage` so it persists across visits.
- **User benefit:** Accessibility and preference; better in bright environments.
- **Technical:** CSS variables or Tailwind dark/light classes; one React context or small hook for theme; apply class on `<html>` or body.

---

## 10. **Anonymous “helpful” vote on reviews**

- **What:** Each review has “Was this helpful? Yes / No” (or thumbs up/down). Show counts and optionally sort reviews by “most helpful”.
- **User benefit:** Surface the most useful reviews and reduce noise.
- **Technical:** Add `helpfulYes: number`, `helpfulNo: number` to each review (or a small votes table in future backend); PATCH or POST to `/api/reviews/:id/helpful`; detail page sorts by helpful count; still in-memory for MVP.

---

## Summary table

| # | Feature                         | Main UX benefit              | Complexity |
|---|---------------------------------|------------------------------|------------|
| 1 | Difficulty + reflective stars   | See course difficulty at a glance | Low  |
| 2 | Would take again                | Quick satisfaction signal    | Low  |
| 3 | Filter by university            | Focus on one school          | Low  |
| 4 | Sort options                    | Find best / easiest / most reviewed | Low  |
| 5 | Course tags per professor      | Match to specific classes    | Medium |
| 6 | Top rated / most reviewed on home | Quick discovery          | Low  |
| 7 | Search by course / in comments | Deeper discovery             | Low–Medium |
| 8 | Export to CSV                   | Use data elsewhere           | Low  |
| 9 | Dark/light theme toggle        | Accessibility & preference   | Low  |
| 10| Helpful vote on reviews        | Surface best reviews         | Medium |

---

Reply with which numbers you want implemented (e.g. “1, 2, 3, 4”) and we can proceed in that order. Feature **1** (difficulty + reflective stars) and **better cards** are already in progress in the codebase.
