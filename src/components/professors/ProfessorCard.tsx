import Link from "next/link";
import type { Professor } from "../../data/professors";
import { Badge } from "../ui/Badge";

type ProfessorCardProps = {
  professor: Professor & {
    averageRating: number;
    reviewCount: number;
  };
};

export function ProfessorCard({ professor }: ProfessorCardProps) {
  return (
    <Link
      href={`/professors/${professor.id}`}
      className="col-span-12 rounded-lg border border-gray-800 bg-surface p-4 transition-colors hover:border-accent sm:col-span-6 lg:col-span-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-gray-100">
            {professor.name}
          </div>
          <div className="mt-1">
            <Badge>{professor.department}</Badge>
          </div>
        </div>
        <div className="text-right text-xs text-gray-400">
          <div className="text-lg font-semibold text-accent">
            {professor.averageRating.toFixed(1)}
          </div>
          <div>avg rating</div>
          <div className="mt-1 text-[10px] text-gray-500">
            {professor.reviewCount} review
            {professor.reviewCount === 1 ? "" : "s"}
          </div>
        </div>
      </div>
    </Link>
  );
}

