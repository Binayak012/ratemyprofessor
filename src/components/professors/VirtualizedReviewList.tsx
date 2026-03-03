"use client";

import React from "react";
import type { Review } from "../../data/professors";
import { StarRatingDisplay } from "../ui/StarRatingDisplay";

const ROW_HEIGHT = 108;
const OVERSCAN = 5;
const COMMENT_PREVIEW_LEN = 120;

type VirtualizedReviewListProps = {
  reviews: Review[];
  containerHeight?: number;
};

export function VirtualizedReviewList({
  reviews,
  containerHeight = 400
}: VirtualizedReviewListProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = React.useState(0);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN
  );
  const visibleCount =
    Math.ceil(containerHeight / ROW_HEIGHT) + OVERSCAN * 2;
  const endIndex = Math.min(reviews.length, startIndex + visibleCount);
  const visibleReviews = reviews.slice(startIndex, endIndex);
  const offsetY = startIndex * ROW_HEIGHT;

  const onScroll = React.useCallback(() => {
    if (containerRef.current)
      setScrollTop(containerRef.current.scrollTop);
  }, []);

  if (reviews.length === 0) {
    return (
      <p className="text-xs text-gray-500 py-4">
        No reviews yet. Be the first to rate this professor.
      </p>
    );
  }

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className="overflow-y-auto overflow-x-hidden"
      style={{ height: containerHeight }}
      role="list"
    >
      <div
        style={{
          height: reviews.length * ROW_HEIGHT,
          position: "relative"
        }}
      >
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: "absolute",
            left: 0,
            right: 0,
            top: 0
          }}
        >
          {visibleReviews.map((review) => (
            <article
              key={review.id}
              role="listitem"
              className="rounded-lg border border-gray-800/80 bg-surfaceMuted/80 p-4 text-xs text-gray-200 shadow-sm mb-3 mx-1"
              style={{ minHeight: ROW_HEIGHT - 12 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-4">
                  <StarRatingDisplay
                    value={review.rating}
                    label="Quality"
                    showReflection
                  />
                  {review.difficulty != null && (
                    <StarRatingDisplay
                      value={review.difficulty}
                      label="Difficulty"
                      showReflection
                    />
                  )}
                </div>
                <div className="text-[10px] text-gray-500">
                  {new Date(review.createdAt).toLocaleString()}
                </div>
              </div>
              {review.comment && (
                <p className="mt-3 text-[11px] leading-relaxed text-gray-200">
                  {expandedId === review.id
                    ? review.comment
                    : review.comment.length <= COMMENT_PREVIEW_LEN
                      ? review.comment
                      : `${review.comment.slice(0, COMMENT_PREVIEW_LEN)}…`}
                  {review.comment.length > COMMENT_PREVIEW_LEN &&
                    expandedId !== review.id && (
                      <button
                        type="button"
                        onClick={() => setExpandedId(review.id)}
                        className="ml-1 text-accent hover:underline"
                      >
                        Expand
                      </button>
                    )}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
