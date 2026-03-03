"use client";

import React from "react";
import Link from "next/link";

type ProfessorHit = {
  id: string;
  name: string;
  department: string;
  universityId: string;
};

function filterProfessorsO(
  list: ProfessorHit[],
  query: string
): ProfessorHit[] {
  const q = query.toLowerCase().trim();
  if (!q) return list;
  const results: ProfessorHit[] = [];
  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    if (
      p.name.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q)
    )
      results.push(p);
  }
  return results;
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [professors, setProfessors] = React.useState<ProfessorHit[]>([]);
  const [selected, setSelected] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const filtered = React.useMemo(
    () => filterProfessorsO(professors, query),
    [professors, query]
  );

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        if (!open) {
          setQuery("");
          setSelected(0);
          setLoading(true);
          fetch("/api/professors")
            .then((r) => r.json())
            .then((data: ProfessorHit[]) => {
              setProfessors(data);
              setLoading(false);
            })
            .catch(() => setLoading(false));
          setTimeout(() => inputRef.current?.focus(), 50);
        }
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && filtered[selected]) {
        e.preventDefault();
        window.location.href = `/professors/${filtered[selected].id}`;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, selected]);

  React.useEffect(() => {
    setSelected(0);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/70 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-xl rounded-xl border border-gray-700 bg-surface shadow-2xl grid grid-cols-12 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="col-span-12 flex items-center gap-2 border-b border-gray-800 px-4 py-3">
          <span className="text-gray-500 text-sm">⌘K</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search professors or departments…"
            className="flex-1 bg-transparent text-sm text-gray-100 placeholder:text-gray-500 outline-none"
            autoFocus
          />
        </div>
        <div
          ref={listRef}
          className="col-span-12 max-h-[50vh] overflow-y-auto"
        >
          {loading ? (
            <div className="px-4 py-6 text-center text-xs text-gray-500">
              Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs text-gray-500">
              No professors match.
            </div>
          ) : (
            <ul className="py-2">
              {filtered.map((p, i) => (
                <li key={p.id}>
                  <Link
                    href={`/professors/${p.id}`}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2.5 text-sm grid grid-cols-12 gap-2 ${
                      i === selected
                        ? "bg-accent/20 text-gray-100"
                        : "text-gray-300 hover:bg-gray-800/50"
                    }`}
                  >
                    <span className="col-span-7 truncate">{p.name}</span>
                    <span className="col-span-3 truncate text-gray-500 text-xs">
                      {p.department}
                    </span>
                    <span className="col-span-2 text-right text-[10px] text-gray-500">
                      View →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-span-12 border-t border-gray-800 px-4 py-2 text-[10px] text-gray-500">
          ↑↓ navigate · Enter open · Esc close
        </div>
      </div>
    </div>
  );
}
