import React from "react";
import type { Professor } from "../../data/professors";
import { filterProfessors, type ProfessorFilter } from "../../lib/filter";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { ProfessorCard } from "./ProfessorCard";

export type ProfessorWithAggregates = Professor & {
  averageRating: number;
  reviewCount: number;
};

type ProfessorListProps = {
  professors: ProfessorWithAggregates[];
};

export function ProfessorList({ professors }: ProfessorListProps) {
  const departments = Array.from(
    new Set(professors.map((p) => p.department))
  ).sort();

  const [filters, setFilters] = React.useState<ProfessorFilter>({
    query: "",
    department: "",
    minRating: undefined
  });

  const filtered = React.useMemo(() => {
    const base = filterProfessors(professors, filters);
    if (typeof filters.minRating === "number") {
      return base.filter(
        (professor) => professor.averageRating >= (filters.minRating ?? 0)
      );
    }
    return base;
  }, [professors, filters]);

  return (
    <>
      <section className="col-span-12 mb-4 grid grid-cols-12 gap-4 rounded-lg border border-gray-800 bg-surface p-4">
        <div className="col-span-12 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
          Filters
        </div>
        <div className="col-span-12 md:col-span-4">
          <label className="mb-1 block text-[11px] text-gray-400">
            Search by name
          </label>
          <Input
            placeholder="e.g. Lovelace"
            value={filters.query ?? ""}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                query: event.target.value
              }))
            }
          />
        </div>
        <div className="col-span-6 md:col-span-4">
          <label className="mb-1 block text-[11px] text-gray-400">
            Department
          </label>
          <Select
            value={filters.department ?? ""}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                department: event.target.value || undefined
              }))
            }
          >
            <option value="">All</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-span-6 md:col-span-4">
          <label className="mb-1 block text-[11px] text-gray-400">
            Minimum rating
          </label>
          <Select
            value={filters.minRating?.toString() ?? ""}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                minRating: event.target.value
                  ? Number(event.target.value)
                  : undefined
              }))
            }
          >
            <option value="">Any</option>
            <option value="3">3.0+</option>
            <option value="4">4.0+</option>
            <option value="4.5">4.5+</option>
          </Select>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="col-span-12 rounded-lg border border-dashed border-gray-800 bg-surface p-6 text-center text-xs text-gray-500">
          No professors match those filters yet.
        </div>
      ) : (
        filtered.map((professor) => (
          <ProfessorCard key={professor.id} professor={professor} />
        ))
      )}
    </>
  );
}

