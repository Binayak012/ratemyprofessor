import Link from "next/link";
import type { Professor } from "../../data/professors";
import { getUniversityName } from "../../data/professors";
import { StarRatingDisplay } from "../ui/StarRatingDisplay";
import { Badge } from "../ui/Badge";

type ProfessorCardProps = {
  professor: Professor & {
    averageRating: number;
    reviewCount: number;
  };
};

export function ProfessorCard({ professor }: ProfessorCardProps) {
  const universityName = getUniversityName(professor.universityId);

  return (
    <Link
      href={`/professors/${professor.id}`}
      className="col-span-12 rounded-lg border border-gray-800/80 bg-surface/90 p-4 shadow-[0_0_25px_rgba(0,0,0,0.6)] transition-transform transition-colors hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)] sm:col-span-6 lg:col-span-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-gray-100">
            {professor.name}
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            <Badge>{professor.department}</Badge>
            <Badge>{universityName}</Badge>
          </div>
        </div>
        <div className="text-right text-xs text-gray-400">
          <StarRatingDisplay value={professor.averageRating} />
          <div className="mt-1 text-[10px] text-gray-500">
            {professor.reviewCount} review
            {professor.reviewCount === 1 ? "" : "s"}
          </div>
        </div>
      </div>
    </Link>
  );
}

