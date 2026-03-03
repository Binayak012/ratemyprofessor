type StarRatingDisplayProps = {
  value: number;
  max?: number;
  className?: string;
};

export function StarRatingDisplay({
  value,
  max = 5,
  className = ""
}: StarRatingDisplayProps) {
  const fullStars = Math.round(value);

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex text-[10px] text-accent">
        {Array.from({ length: max }).map((_, index) => {
          const starValue = index + 1;
          return (
            <span key={starValue}>
              {starValue <= fullStars ? "★" : "☆"}
            </span>
          );
        })}
      </div>
      <span className="text-[10px] text-gray-400">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

