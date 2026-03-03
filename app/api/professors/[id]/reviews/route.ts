import { NextResponse } from "next/server";
import { addReview, getProfessorById, getReviews } from "../../data";
import { getProfessorReviews } from "../../../../../src/lib/rating";

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

  const allReviews = getReviews();
  const professorReviews = getProfessorReviews(allReviews, professor.id);

  return NextResponse.json(professorReviews);
}

export async function POST(request: Request, { params }: Params) {
  const professor = getProfessorById(params.id);
  if (!professor) {
    return NextResponse.json({ error: "Professor not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as any).rating !== "number" ||
    (body as any).rating < 1 ||
    (body as any).rating > 5
  ) {
    return NextResponse.json(
      { error: "rating must be a number between 1 and 5" },
      { status: 400 }
    );
  }

  const rating = (body as any).rating as number;
  const commentRaw = (body as any).comment;
  const comment =
    typeof commentRaw === "string" && commentRaw.trim().length > 0
      ? commentRaw.trim()
      : undefined;

  const difficultyRaw = (body as any).difficulty;
  const difficulty =
    typeof difficultyRaw === "number" &&
    difficultyRaw >= 1 &&
    difficultyRaw <= 5
      ? difficultyRaw
      : undefined;

  const review = addReview({
    professorId: professor.id,
    rating,
    difficulty,
    comment
  });

  return NextResponse.json(review, { status: 201 });
}

