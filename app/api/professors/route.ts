import { NextResponse } from "next/server";
import { getProfessors, getReviews } from "./data";
import {
  calculateAverageDifficulty,
  calculateAverageRating,
  getProfessorReviews
} from "../../../src/lib/rating";

export async function GET() {
  const professors = getProfessors();
  const reviews = getReviews();

  const payload = professors.map((professor) => {
    const professorReviews = getProfessorReviews(reviews, professor.id);
    const averageRating = calculateAverageRating(professorReviews);
    const averageDifficulty = calculateAverageDifficulty(professorReviews);

    return {
      ...professor,
      averageRating,
      averageDifficulty: averageDifficulty ?? null,
      reviewCount: professorReviews.length
    };
  });

  return NextResponse.json(payload);
}

