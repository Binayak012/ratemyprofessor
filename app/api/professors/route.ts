import { NextResponse } from "next/server";
import { getProfessors, getReviews } from "./data";
import { calculateAverageRating, getProfessorReviews } from "../../../src/lib/rating";

export async function GET() {
  const professors = getProfessors();
  const reviews = getReviews();

  const payload = professors.map((professor) => {
    const professorReviews = getProfessorReviews(reviews, professor.id);
    const averageRating = calculateAverageRating(professorReviews);

    return {
      ...professor,
      averageRating,
      reviewCount: professorReviews.length
    };
  });

  return NextResponse.json(payload);
}

