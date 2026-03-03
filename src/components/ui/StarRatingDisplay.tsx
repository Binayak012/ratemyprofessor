type StarRatingDisplayProps = {
  value: number;
  max?: number;
  label?: string;
  showReflection?: boolean;
  className?: string;
};

export function StarRatingDisplay({
  value,
  max = 5,
  label,
  showReflection = true,
  className = ""
}: StarRatingDisplayProps) {
  const fullStars = Math.round(value);

  const starRow = (
    <div className="flex text-accent" aria-hidden>
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        return (
          <span key={starValue} className="drop-shadow-[0_0_6px_rgba(59,130,246,0.4)]">
            {starValue <= fullStars ? "★" : "☆"}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className={`inline-flex flex-col items-start gap-0 ${className}`}>
      {label && (
        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
          {label}
        </span>
      )}
      <div className="relative">
        <div className="text-sm leading-none">{starRow}</div>
        {showReflection && (
          <div
            className="pointer-events-none mt-0.5 origin-top scale-y-[-0.35] opacity-30"
            aria-hidden
          >
            <div className="flex text-sm text-accent">
              {Array.from({ length: max }).map((_, index) => {
                const starValue = index + 1;
                return (
                  <span key={starValue}>
                    {starValue <= fullStars ? "★" : "☆"}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <span className="text-[10px] text-gray-400 tabular-nums">
        {value.toFixed(1)}
      </span>
    </div>
  );
}
