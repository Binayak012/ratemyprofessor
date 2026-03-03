import { NextResponse } from "next/server";
import { getProfessorById, getReviews } from "../data";
import {
  calculateAverageRating,
  getProfessorReviews
} from "../../../../src/lib/rating";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  const professor = getProfessorById(params.id);
  if (!professor) {
    return NextResponse.json({ error: "Professor not found" }, { status: 404 });
  }

  const reviews = getReviews();
  const professorReviews = getProfessorReviews(reviews, professor.id);
  const averageRating = calculateAverageRating(professorReviews);

  return NextResponse.json({
    ...professor,
    averageRating,
    reviews: professorReviews
  });
}

