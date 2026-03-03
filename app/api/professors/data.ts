import { initialReviews, professors, type Professor, type Review } from "../../../src/data/professors";

let reviews: Review[] = [...initialReviews];

export function getProfessors(): Professor[] {
  return professors;
}

export function getProfessorById(id: string): Professor | undefined {
  return professors.find((professor) => professor.id === id);
}

export function getReviews(): Review[] {
  return reviews;
}

export function addReview(input: {
  professorId: string;
  rating: number;
  difficulty?: number;
  comment?: string;
}): Review {
  const now = new Date().toISOString();

  const sanitizedComment =
    typeof input.comment === "string" ? input.comment.slice(0, 500) : undefined;

  const difficulty =
    typeof input.difficulty === "number" &&
    input.difficulty >= 1 &&
    input.difficulty <= 5
      ? input.difficulty
      : undefined;

  const review: Review = {
    id: `r_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    professorId: input.professorId,
    rating: input.rating,
    difficulty,
    comment: sanitizedComment,
    createdAt: now
  };

  reviews = [...reviews, review];
  return review;
}

