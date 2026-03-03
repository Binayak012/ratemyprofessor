"use client";

import React from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

type RatingFormProps = {
  onSubmit: (input: { rating: number; comment?: string }) => Promise<void>;
};

export function RatingForm({ onSubmit }: RatingFormProps) {
  const [rating, setRating] = React.useState<number | "">("");
  const [comment, setComment] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (rating === "" || rating < 1 || rating > 5) {
      setError("Please choose a rating between 1 and 5.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        rating,
        comment: comment.trim() ? comment.trim() : undefined
      });

      setRating("");
      setComment("");
    } catch (error_) {
      setError(
        error_ instanceof Error
          ? error_.message
          : "Something went wrong submitting your rating."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="col-span-12 space-y-3 rounded-lg border border-gray-800 bg-surface p-4 lg:col-span-4"
    >
      <h2 className="text-sm font-semibold text-gray-100">
        Add your rating
      </h2>
      <p className="text-[11px] text-gray-500">
        Ratings are stored only in this browser session for the classroom MVP.
      </p>

      <div>
        <label className="mb-1 block text-[11px] text-gray-400">
          Rating (1–5)
        </label>
        <Input
          type="number"
          min={1}
          max={5}
          step={0.5}
          value={rating}
          onChange={(event) =>
            setRating(
              event.target.value === "" ? "" : Number(event.target.value)
            )
          }
        />
      </div>

      <div>
        <label className="mb-1 block text-[11px] text-gray-400">
          Optional comment
        </label>
        <textarea
          className="w-full rounded-lg border border-gray-800 bg-surface py-2 px-3 text-xs text-gray-100 outline-none transition-colors placeholder:text-gray-500 focus:border-accent focus:ring-1 focus:ring-accent"
          rows={4}
          maxLength={500}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="What was helpful, challenging, or surprising?"
        />
      </div>

      {error && (
        <p className="text-[11px] text-red-400" role="alert">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full justify-center"
      >
        {submitting ? "Submitting…" : "Submit rating"}
      </Button>
    </form>
  );
}

