"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type FloatingQuickActionProps = {
  professorId?: string | null;
};

function FloatingQuickActionInner({ professorId }: FloatingQuickActionProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {open && (
        <div className="grid grid-cols-12 gap-2 rounded-lg border border-gray-700 bg-surface p-2 shadow-xl">
          <Link
            href="/professors"
            className="col-span-12 rounded border border-gray-700 bg-surfaceMuted px-3 py-2 text-xs text-gray-200 hover:border-accent hover:text-accent"
            onClick={() => setOpen(false)}
          >
            Browse professors
          </Link>
          {professorId && (
            <Link
              href={`/professors/${professorId}#rate`}
              className="col-span-12 rounded border border-gray-700 bg-surfaceMuted px-3 py-2 text-xs text-gray-200 hover:border-accent hover:text-accent"
              onClick={() => setOpen(false)}
            >
              Add rating
            </Link>
          )}
          <Link
            href="/"
            className="col-span-12 rounded border border-gray-700 bg-surfaceMuted px-3 py-2 text-xs text-gray-200 hover:border-accent hover:text-accent"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-700 bg-surface text-gray-200 shadow-lg transition-colors hover:border-accent hover:text-accent"
        aria-label="Quick actions"
      >
        <span className="text-lg">+</span>
      </button>
    </div>
  );
}

export function FloatingQuickAction() {
  const pathname = usePathname();
  const match = pathname?.match(/^\/professors\/([^/]+)$/);
  const professorId = match?.[1] ?? null;
  return <FloatingQuickActionInner professorId={professorId} />;
}
