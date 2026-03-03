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

