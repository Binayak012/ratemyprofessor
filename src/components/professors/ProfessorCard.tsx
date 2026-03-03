import Link from "next/link";
import type { Professor } from "../../data/professors";
import { getUniversityName } from "../../data/professors";
import { StarRatingDisplay } from "../ui/StarRatingDisplay";
import { Badge } from "../ui/Badge";

type ProfessorCardProps = {
  professor: Professor & {
    averageRating: number;
    averageDifficulty: number | null;
    reviewCount: number;
  };
};

export function ProfessorCard({ professor }: ProfessorCardProps) {
  const universityName = getUniversityName(professor.universityId);

  return (
    <Link
      href={`/professors/${professor.id}`}
      className="group col-span-12 block overflow-hidden rounded-xl border border-gray-700/80 bg-gradient-to-b from-surface to-surfaceMuted/80 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(59,130,246,0.08)] sm:col-span-6 lg:col-span-4"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-gray-100 group-hover:text-white">
              {professor.name}
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge>{professor.department}</Badge>
              <Badge>{universityName}</Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-3 border-t border-gray-800/80 pt-4">
          <div className="flex flex-wrap gap-4">
            <StarRatingDisplay
              value={professor.averageRating}
              label="Quality"
              showReflection
            />
            {professor.averageDifficulty != null && (
              <StarRatingDisplay
                value={professor.averageDifficulty}
                label="Difficulty"
                showReflection
              />
            )}
          </div>
          <div className="text-right text-[10px] text-gray-500">
            {professor.reviewCount} review
            {professor.reviewCount === 1 ? "" : "s"}
          </div>
        </div>
      </div>
    </Link>
  );
}
