import type { Professor, Review } from "../../data/professors";
import { calculateAverageRating } from "../../lib/rating";
import { getUniversityName } from "../../data/professors";
import { Badge } from "../ui/Badge";
import { StarRatingDisplay } from "../ui/StarRatingDisplay";

type ProfessorDetailProps = {
  professor: Professor;
  reviews: Review[];
};

export function ProfessorDetail({ professor, reviews }: ProfessorDetailProps) {
  const averageRating = calculateAverageRating(reviews);
  const universityName = getUniversityName(professor.universityId);

  return (
    <section className="col-span-12 rounded-lg border border-gray-800 bg-surface p-6 lg:col-span-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-100">
            {professor.name}
          </h1>
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge>{professor.department}</Badge>
            <Badge>{universityName}</Badge>
          </div>
        </div>
        <div className="text-right text-xs text-gray-400">
          <div className="text-3xl font-semibold text-accent">
            {averageRating.toFixed(1)}
          </div>
          <div className="mt-1">
            <StarRatingDisplay value={averageRating} />
          </div>
          <div className="mt-1 text-[10px] text-gray-500">
            {reviews.length} review{reviews.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {reviews.length === 0 ? (
          <p className="text-xs text-gray-500">
            No reviews yet. Be the first to rate this professor.
          </p>
        ) : (
          reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-lg border border-gray-800 bg-surfaceMuted p-3 text-xs text-gray-200"
            >
              <div className="flex items-center justify-between gap-2">
                <StarRatingDisplay value={review.rating} />
                <div className="text-[10px] text-gray-500">
                  {new Date(review.createdAt).toLocaleString()}
                </div>
              </div>
              {review.comment && (
                <p className="mt-2 text-[11px] leading-relaxed text-gray-200">
                  {review.comment}
                </p>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}

