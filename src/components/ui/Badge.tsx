import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-700 bg-surfaceMuted px-2 py-0.5 text-[10px] uppercase tracking-wide text-gray-400">
      {children}
    </span>
  );
}

