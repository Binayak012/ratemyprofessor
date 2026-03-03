"use client";

import React from "react";

type StarRatingInputProps = {
  value: number | "";
  onChange: (value: number) => void;
};

export function StarRatingInput({ value, onChange }: StarRatingInputProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const active = hovered ?? (value === "" ? 0 : value);

  return (
    <div className="flex items-center gap-2">
      <div className="flex text-base text-accent">
        {Array.from({ length: 5 }).map((_, index) => {
          const starValue = index + 1;
          const filled = starValue <= active;

          return (
            <button
              key={starValue}
              type="button"
              className="cursor-pointer border-none bg-transparent p-0"
              onMouseEnter={() => setHovered(starValue)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onChange(starValue)}
            >
              <span className={filled ? "text-accent" : "text-gray-600"}>
                {filled ? "★" : "☆"}
              </span>
            </button>
          );
        })}
      </div>
      <span className="text-[11px] text-gray-400">
        {active > 0 ? `${active.toFixed(1)} / 5` : "Choose a rating"}
      </span>
    </div>
  );
}

