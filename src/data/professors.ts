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
  { id: "p3", name: "Dr. Grace Hopper", department: "Computer Science" },
  { id: "p4", name: "Dr. Donald Knuth", department: "Computer Science" },
  { id: "p5", name: "Dr. Barbara Liskov", department: "Computer Science" },
  { id: "p6", name: "Dr. Linus Torvalds", department: "Computer Science" },
  { id: "p7", name: "Dr. Tim Berners-Lee", department: "Computer Science" },
  { id: "p8", name: "Dr. Leslie Lamport", department: "Computer Science" },
  { id: "p9", name: "Dr. Edsger Dijkstra", department: "Computer Science" },
  { id: "p10", name: "Dr. Margaret Hamilton", department: "Computer Science" },
  { id: "p11", name: "Dr. Emmy Noether", department: "Mathematics" },
  { id: "p12", name: "Dr. Srinivasa Ramanujan", department: "Mathematics" },
  { id: "p13", name: "Dr. Terence Tao", department: "Mathematics" },
  { id: "p14", name: "Dr. Katherine Johnson", department: "Mathematics" },
  { id: "p15", name: "Dr. Richard Feynman", department: "Physics" },
  { id: "p16", name: "Dr. Marie Curie", department: "Physics" },
  { id: "p17", name: "Dr. Albert Einstein", department: "Physics" },
  { id: "p18", name: "Dr. Chien-Shiung Wu", department: "Physics" },
  { id: "p19", name: "Dr. Jane Goodall", department: "Biology" },
  { id: "p20", name: "Dr. Rosalind Franklin", department: "Biology" }
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
    comment: "Legendary lectures, very engaging.",
    createdAt: new Date().toISOString()
  },
  {
    id: "r4",
    professorId: "p4",
    rating: 5,
    comment: "Makes algorithms feel intuitive.",
    createdAt: new Date().toISOString()
  },
  {
    id: "r5",
    professorId: "p5",
    rating: 4,
    comment: "Great projects, grading is strict but fair.",
    createdAt: new Date().toISOString()
  },
  {
    id: "r6",
    professorId: "p10",
    rating: 5,
    comment: "Super inspiring and supportive of students.",
    createdAt: new Date().toISOString()
  },
  {
    id: "r7",
    professorId: "p11",
    rating: 5,
    comment: "Explains abstract algebra with clear intuition.",
    createdAt: new Date().toISOString()
  },
  {
    id: "r8",
    professorId: "p13",
    rating: 4,
    comment: "Very deep material, office hours are essential.",
    createdAt: new Date().toISOString()
  },
  {
    id: "r9",
    professorId: "p15",
    rating: 5,
    comment: "Physics demos are unforgettable.",
    createdAt: new Date().toISOString()
  },
  {
    id: "r10",
    professorId: "p17",
    rating: 4,
    comment: "Mind-bending lectures, homework is tough.",
    createdAt: new Date().toISOString()
  },
  {
    id: "r11",
    professorId: "p19",
    rating: 5,
    comment: "Field stories make the material come alive.",
    createdAt: new Date().toISOString()
  }
];

