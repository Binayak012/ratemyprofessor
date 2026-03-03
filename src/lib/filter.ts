export type ProfessorFilter = {
  query?: string;
  department?: string;
  universityId?: string;
  minRating?: number;
};

export function filterProfessors<
  T extends { name: string; department: string; universityId?: string }
>(professors: T[], filters: ProfessorFilter): T[] {
  const { query, department, universityId, minRating } = filters;

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

    if (universityId && professor.universityId !== universityId) {
      return false;
    }

    if (typeof minRating === "number") {
      // minRating is applied on the frontend via precomputed aggregates
    }

    return true;
  });
}

