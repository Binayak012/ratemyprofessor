"use client";

import React from "react";

export type RadarStats = {
  clarity: number;
  difficulty: number;
  grading: number;
  accessibility: number;
  workload: number;
};

const LABELS: (keyof RadarStats)[] = [
  "clarity",
  "difficulty",
  "grading",
  "accessibility",
  "workload"
];

const RADIUS = 32;
const CENTER = 40;

function polarToCart(angle: number, r: number) {
  const a = angle - Math.PI / 2;
  return { x: CENTER + r * Math.cos(a), y: CENTER + r * Math.sin(a) };
}

type RadarStatCardProps = {
  stats: RadarStats;
  className?: string;
};

export function RadarStatCard({ stats, className = "" }: RadarStatCardProps) {
  const points = React.useMemo(() => {
    return LABELS.map((key, i) => {
      const angle = (i * 2 * Math.PI) / LABELS.length;
      const value = Math.max(0, Math.min(5, stats[key] ?? 0));
      const r = (value / 5) * RADIUS;
      return polarToCart(angle, r);
    });
  }, [stats]);

  const pathD = React.useMemo(() => {
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  }, [points]);

  const gridPath = React.useMemo(() => {
    const levels = [1, 2, 3, 4, 5];
    return levels.map((level) => {
      const r = (level / 5) * RADIUS;
      const pts = LABELS.map((_, i) => {
        const angle = (i * 2 * Math.PI) / LABELS.length - Math.PI / 2;
        return `${CENTER + r * Math.cos(angle)} ${CENTER + r * Math.sin(angle)}`;
      });
      return `M ${pts[0]} L ${pts.slice(1).join(" L ")} Z`;
    });
  }, []);

  return (
    <div
      className={`rounded-lg border border-gray-800 bg-surfaceMuted/80 p-3 ${className}`}
    >
      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-2">
        Stats
      </p>
      <svg
        viewBox="0 0 80 80"
        className="w-full max-w-[120px] h-auto mx-auto block"
        aria-hidden
      >
        {gridPath.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />
        ))}
        {LABELS.map((key, i) => {
          const angle = (i * 2 * Math.PI) / LABELS.length - Math.PI / 2;
          const end = polarToCart(-angle + Math.PI / 2, RADIUS);
          return (
            <line
              key={key}
              x1={CENTER}
              y1={CENTER}
              x2={end.x}
              y2={end.y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.5"
            />
          );
        })}
        <path
          d={pathD}
          fill="rgba(59,130,246,0.2)"
          stroke="rgba(59,130,246,0.7)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {LABELS.map((key, i) => {
          const angle = (i * 2 * Math.PI) / LABELS.length;
          const pos = polarToCart(angle, RADIUS + 8);
          return (
            <text
              key={key}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              className="fill-gray-500"
              style={{ fontSize: 5 }}
            >
              {key.slice(0, 4)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export function deriveRadarFromReviews(
  rating: number,
  difficulty: number | null
): RadarStats {
  const d = difficulty ?? 3;
  return {
    clarity: rating,
    difficulty: d,
    grading: Math.max(1, Math.min(5, rating * 0.95)),
    accessibility: Math.max(1, Math.min(5, rating + 0.5)),
    workload: Math.max(1, Math.min(5, d > 0 ? 6 - d : 3))
  };
}
