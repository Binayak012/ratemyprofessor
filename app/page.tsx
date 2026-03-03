import { Button } from "../src/components/ui/Button";
import { FlappyBirdGame } from "../src/components/canvas/FlappyBirdGame";

export default function HomePage() {
  return (
    <>
      <section className="col-span-12 rounded-lg border border-gray-800/80 bg-surface/90 p-6 shadow-[0_0_40px_rgba(0,0,0,0.6)] lg:col-span-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          Today&apos;s Project
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-100">
          Rate Your Professor
        </h1>
        <p className="mt-4 text-sm text-gray-300">
          An application that allows students to rate their professors. Built as
          a same‑day MVP with a focus on clarity, performance, and a minimalist
          dark UI.
        </p>
        <div className="mt-4 space-y-2 text-xs text-gray-300">
          <p>
            <span className="font-semibold text-gray-100">What</span>: Browse a
            list of professors, see ratings, and quickly add your own feedback.
          </p>
          <p>
            <span className="font-semibold text-gray-100">How</span>: Built
            using Next.js 14, React 18, and Tailwind CSS with an AI‑assisted
            workflow.
          </p>
          <p>
            <span className="font-semibold text-gray-100">When</span>: Right
            now—the goal is to have a working app by the end of class.
          </p>
        </div>
        <div className="mt-6">
          <a href="/professors">
            <Button>Browse professors</Button>
          </a>
        </div>
      </section>

      <aside className="col-span-12 space-y-4 rounded-lg border border-gray-800/80 bg-surface/80 p-6 text-xs text-gray-400 shadow-[0_20px_60px_rgba(0,0,0,0.8)] lg:col-span-4 lg:translate-y-4 lg:transform lg:hover:-translate-y-0 lg:hover:shadow-[0_40px_80px_rgba(15,23,42,0.9)] lg:transition-all">
        <p className="font-semibold text-gray-100">MVP Checklist</p>
        <ul className="mt-2 space-y-1 list-disc pl-4">
          <li>View and search professors.</li>
          <li>Filter by university, department, rating.</li>
          <li>See quality &amp; difficulty stars with reflection.</li>
          <li>Open a detail view and submit a rating.</li>
        </ul>
        <div className="mt-4 rounded-lg border border-gray-700/80 bg-surfaceMuted/80 p-4">
          <p className="font-semibold text-gray-100">Flappy Bird</p>
          <p className="mt-1 text-[11px] text-gray-500">
            Click or press Space to flap. Avoid the pipes.
          </p>
          <FlappyBirdGame />
        </div>
      </aside>
    </>
  );
}

