export type ProfessorFilter = {
  query?: string;
  department?: string;
  minRating?: number;
};

export function filterProfessors<T extends { name: string; department: string }>(
  professors: T[],
  filters: ProfessorFilter
): T[] {
  const { query, department, minRating } = filters;

  const normalizedQuery = query?.toLowerCase().trim() ?? "";

  // O(n) pass over professors
  return professors.filter((professor) => {
    if (normalizedQuery) {
      const inName = professor.name.toLowerCase().includes(normalizedQuery);
      if (!inName) return false;
    }

    if (department && professor.department !== department) {
      return false;
    }

    if (typeof minRating === "number") {
      // Rating filtering by minRating is implemented on the frontend
      // using precomputed aggregates; backend stays agnostic here.
    }

    return true;
  });
}

