"use client";

import React from "react";

type BimodalDistributionProps = {
  /** Counts for rating 1..5 */
  distribution: [number, number, number, number, number];
  className?: string;
};

export function BimodalDistribution({
  distribution,
  className = ""
}: BimodalDistributionProps) {
  const max = Math.max(1, ...distribution);

  return (
    <div
      className={`rounded-lg border border-gray-800 bg-surfaceMuted/80 p-3 ${className}`}
    >
      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-2">
        Rating distribution
      </p>
      <div className="flex items-end justify-between gap-1 h-12">
        {distribution.map((count, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-0.5"
            title={`${i + 1} star: ${count}`}
          >
            <div
              className="w-full rounded-t bg-accent/50 transition-all min-h-[4px]"
              style={{
                height: `${(count / max) * 100}%`
              }}
            />
            <span className="text-[9px] text-gray-500">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function getRatingDistribution(reviews: { rating: number }[]): [
  number,
  number,
  number,
  number,
  number
] {
  const d: [number, number, number, number, number] = [0, 0, 0, 0, 0];
  for (let i = 0; i < reviews.length; i++) {
    const r = Math.max(1, Math.min(5, Math.round(reviews[i].rating)));
    d[r - 1]++;
  }
  return d;
}
