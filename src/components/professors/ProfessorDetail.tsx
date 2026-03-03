import type { Professor, Review } from "../../data/professors";
import {
  calculateAverageDifficulty,
  calculateAverageRating
} from "../../lib/rating";
import { getUniversityName } from "../../data/professors";
import { Badge } from "../ui/Badge";
import { StarRatingDisplay } from "../ui/StarRatingDisplay";
import {
  RadarStatCard,
  deriveRadarFromReviews
} from "../ui/RadarStatCard";
import {
  BimodalDistribution,
  getRatingDistribution
} from "../ui/BimodalDistribution";
import { VirtualizedReviewList } from "./VirtualizedReviewList";

type ProfessorDetailProps = {
  professor: Professor;
  reviews: Review[];
};

export function ProfessorDetail({ professor, reviews }: ProfessorDetailProps) {
  const averageRating = calculateAverageRating(reviews);
  const averageDifficulty = calculateAverageDifficulty(reviews);
  const universityName = getUniversityName(professor.universityId);
  const radarStats = deriveRadarFromReviews(
    averageRating,
    averageDifficulty ?? 3
  );
  const auraScore =
    (averageRating * 0.5 +
      (averageDifficulty != null ? (6 - averageDifficulty) * 0.1 : 0.3)) *
    20;
  const auraDisplay = Math.min(99, Math.round(auraScore));

  return (
    <section className="col-span-12 overflow-hidden rounded-xl border border-gray-700/80 bg-gradient-to-b from-surface to-surfaceMuted/50 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.03)] lg:col-span-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-100">
            {professor.name}
          </h1>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge>{professor.department}</Badge>
            <Badge>{universityName}</Badge>
          </div>
        </div>
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex flex-wrap gap-6 text-xs text-gray-400">
            <StarRatingDisplay
              value={averageRating}
              label="Quality"
              showReflection
            />
            {averageDifficulty != null && (
              <StarRatingDisplay
                value={averageDifficulty}
                label="Difficulty"
                showReflection
              />
            )}
            <div className="text-[10px] text-gray-500">
              {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </div>
          </div>
          <RadarStatCard stats={radarStats} />
          <div className="rounded-lg border border-gray-700 bg-surfaceMuted/80 px-3 py-2 text-center">
            <div className="text-[10px] uppercase tracking-wider text-gray-500">
              Aura
            </div>
            <div className="text-lg font-semibold tabular-nums text-accent">
              {auraDisplay}
            </div>
          </div>
          {reviews.length > 0 && (
            <BimodalDistribution
              distribution={getRatingDistribution(reviews)}
            />
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-gray-800/80 pt-6">
        <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
          Reviews (virtualized)
        </p>
        <VirtualizedReviewList reviews={reviews} containerHeight={420} />
      </div>
    </section>
  );
}

