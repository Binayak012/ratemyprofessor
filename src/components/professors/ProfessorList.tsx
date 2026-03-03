"use client";

import React from "react";
import type { Professor } from "../../data/professors";
import { universities } from "../../data/professors";
import { filterProfessors, type ProfessorFilter } from "../../lib/filter";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { ProfessorCard } from "./ProfessorCard";

export type ProfessorWithAggregates = Professor & {
  averageRating: number;
  averageDifficulty: number | null;
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
    universityId: undefined,
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
        <div className="col-span-12 md:col-span-3">
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
        <div className="col-span-6 md:col-span-3">
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
        <div className="col-span-6 md:col-span-3">
          <label className="mb-1 block text-[11px] text-gray-400">
            University
          </label>
          <Select
            value={filters.universityId ?? ""}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                universityId: event.target.value || undefined
              }))
            }
          >
            <option value="">All</option>
            {universities.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-span-6 md:col-span-3">
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
        <div className="col-span-12 mt-2 flex flex-wrap gap-2">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider mr-1">
            Quick:
          </span>
          {[
            { label: "High rated", minRating: 4 },
            { label: "Top tier", minRating: 4.5 },
            { label: "Computer Science", department: "Computer Science" },
            { label: "Mathematics", department: "Mathematics" },
            { label: "Physics", department: "Physics" },
            { label: "Biology", department: "Biology" }
          ].map((tag) => {
            const active =
              (tag.minRating != null && filters.minRating === tag.minRating) ||
              (tag.department != null && filters.department === tag.department);
            return (
              <button
                key={tag.label}
                type="button"
                onClick={() =>
                  setFilters((c) => ({
                    ...c,
                    minRating: tag.minRating ?? c.minRating,
                    department: tag.department ?? c.department
                  }))
                }
                className={`rounded-full border px-2.5 py-1 text-[10px] transition-colors ${
                  active
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300"
                }`}
              >
                {tag.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() =>
              setFilters({
                query: "",
                department: "",
                universityId: undefined,
                minRating: undefined
              })
            }
            className="rounded-full border border-gray-700 px-2.5 py-1 text-[10px] text-gray-500 hover:border-gray-600 hover:text-gray-400"
          >
            Clear
          </button>
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

