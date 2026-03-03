import type { Review } from "../data/professors";

export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((total / reviews.length).toFixed(2));
}

export function getProfessorReviews(
  allReviews: Review[],
  professorId: string
): Review[] {
  return allReviews.filter((review) => review.professorId === professorId);
}

/** Average difficulty (1–5) over reviews that have difficulty set. O(n). */
export function calculateAverageDifficulty(reviews: Review[]): number | null {
  const withDiff = reviews.filter((r) => typeof r.difficulty === "number");
  if (withDiff.length === 0) return null;
  const total = withDiff.reduce((sum, r) => sum + (r.difficulty ?? 0), 0);
  return Number((total / withDiff.length).toFixed(2));
}

