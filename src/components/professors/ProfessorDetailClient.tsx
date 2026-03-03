"use client";

import React from "react";
import type { Professor, Review } from "../../data/professors";
import { ProfessorDetail } from "./ProfessorDetail";
import { RatingForm } from "./RatingForm";

type ProfessorDetailClientProps = {
  professor: Professor;
  initialReviews: Review[];
};

export function ProfessorDetailClient({
  professor,
  initialReviews
}: ProfessorDetailClientProps) {
  const [reviews, setReviews] = React.useState<Review[]>(initialReviews);

  async function handleSubmit(input: { rating: number; comment?: string }) {
    const response = await fetch(`/api/professors/${professor.id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      throw new Error("Failed to submit rating");
    }

    const created: Review = await response.json();
    setReviews((current) => [...current, created]);
  }

  return (
    <>
      <ProfessorDetail professor={professor} reviews={reviews} />
      <RatingForm onSubmit={handleSubmit} />
    </>
  );
}

