import { notFound } from "next/navigation";
import type { Professor, Review } from "../../../src/data/professors";
import { ProfessorDetail } from "../../../src/components/professors/ProfessorDetail";
import { RatingForm } from "../../../src/components/professors/RatingForm";

type ProfessorResponse = Professor & {
  averageRating: number;
  reviews: Review[];
};

type Params = {
  params: {
    id: string;
  };
};

async function fetchProfessor(id: string): Promise<ProfessorResponse> {
  const response = await fetch(
    `http://localhost:3000/api/professors/${id}`,
    { cache: "no-store", next: { revalidate: 0 } }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to load professor");
  }

  return response.json();
}

export default async function ProfessorDetailPage({ params }: Params) {
  const professor = await fetchProfessor(params.id);

  async function handleSubmit(input: { rating: number; comment?: string }) {
    const response = await fetch(
      `http://localhost:3000/api/professors/${params.id}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit rating");
    }
  }

  return (
    <>
      <ProfessorDetail professor={professor} reviews={professor.reviews} />
      <RatingForm onSubmit={handleSubmit} />
    </>
  );
}

