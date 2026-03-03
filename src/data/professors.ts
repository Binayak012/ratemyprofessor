export type Review = {
  id: string;
  professorId: string;
  rating: number; // 1–5
  comment?: string;
  createdAt: string;
};

export type Professor = {
  id: string;
  name: string;
  department: string;
};

export const professors: Professor[] = [
  { id: "p1", name: "Dr. Ada Lovelace", department: "Computer Science" },
  { id: "p2", name: "Dr. Alan Turing", department: "Computer Science" },
  { id: "p3", name: "Dr. Emmy Noether", department: "Mathematics" },
  { id: "p4", name: "Dr. Richard Feynman", department: "Physics" }
];

export const initialReviews: Review[] = [
  {
    id: "r1",
    professorId: "p1",
    rating: 5,
    comment: "Clear explanations and very supportive.",
    createdAt: new Date().toISOString()
  },
  {
    id: "r2",
    professorId: "p2",
    rating: 4,
    comment: "Challenging but fair.",
    createdAt: new Date().toISOString()
  },
  {
    id: "r3",
    professorId: "p3",
    rating: 5,
    comment: "Incredible at connecting theory to practice.",
    createdAt: new Date().toISOString()
  }
];

