"use client";

import React from "react";

const STAR_COUNT = 120;

function useStars() {
  return React.useMemo(() => {
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
      duration: 1.5 + Math.random() * 2
    }));
  }, []);
}

export function TwinklingStars() {
  const stars = useStars();

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animation: `star-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            boxShadow:
              "0 0 22px 6px rgba(255,255,255,1), 0 0 60px 18px rgba(255,255,255,0.65)"
          }}
        />
      ))}
    </div>
  );
}
