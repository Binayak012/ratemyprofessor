import { ProfessorList, type ProfessorWithAggregates } from "../../src/components/professors/ProfessorList";
import { Breadcrumbs } from "../../src/components/dom/Breadcrumbs";

async function fetchProfessors(): Promise<ProfessorWithAggregates[]> {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const response = await fetch(`${base}/api/professors`, {
    cache: "no-store",
    next: { revalidate: 0 }
  });

  if (!response.ok) {
    throw new Error("Failed to load professors");
  }

  return response.json();
}

export default async function ProfessorsPage() {
  const professors = await fetchProfessors();

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Professors" }]}
      />
      <section className="col-span-12 mb-4">
        <h1 className="text-xl font-semibold text-gray-100">
          Professors
        </h1>
        <p className="mt-2 text-xs text-gray-400">
          Browse the current dataset of professors. Use the filters to narrow
          down by name, department, or rating.
        </p>
      </section>

      <ProfessorList professors={professors} />
    </>
  );
}

