"use client";

import React from "react";

const W = 280;
const H = 220;
const GRAVITY = 0.035;
const FLAP = -1.05;
const PIPE_W = 44;
const PIPE_GAP = 90;
const PIPE_SPEED = 0.25;
const BIRD_W = 20;
const BIRD_H = 16;
const GROUND_H = 24;

type GameState = "idle" | "playing" | "over";

export function FlappyBirdGame() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [score, setScore] = React.useState(0);
  const [state, setState] = React.useState<GameState>("idle");
  const scoreDisplayRef = React.useRef(0);

  const gameRef = React.useRef<{
    birdY: number;
    birdVy: number;
    pipes: Array<{ x: number; top: number; bottom: number; scored: boolean }>;
  }>({ birdY: H / 2 - BIRD_H / 2, birdVy: 0, pipes: [] });

  const startGame = React.useCallback(() => {
    setState("playing");
    setScore(0);
    scoreDisplayRef.current = 0;
    const skyH = H - GROUND_H;
    gameRef.current = {
      birdY: 16,
      birdVy: 0,
      pipes: []
    };
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    let rafId: number;
    const skyH = H - GROUND_H;

    function drawSky() {
      const ctx = context;
      const grad = ctx.createLinearGradient(0, 0, 0, skyH);
      grad.addColorStop(0, "#5c94e8");
      grad.addColorStop(1, "#87ceeb");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, skyH);
    }

    function drawGround() {
      const ctx = context;
      ctx.fillStyle = "#deb887";
      ctx.fillRect(0, skyH, W, GROUND_H);
      ctx.fillStyle = "#8b7355";
      ctx.fillRect(0, skyH, W, 4);
      ctx.fillStyle = "#654321";
      ctx.font = "10px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("FLAPPY BIRD", W / 2, skyH + 14);
    }

    function drawPipe(p: { x: number; top: number; bottom: number }) {
      const ctx = context;
      const capH = 12;
      ctx.fillStyle = "#2d8a3e";
      ctx.strokeStyle = "#1a5c24";
      ctx.lineWidth = 2;
      ctx.fillRect(p.x, 0, PIPE_W, p.top);
      ctx.strokeRect(p.x, 0, PIPE_W, p.top);
      ctx.fillStyle = "#3cb371";
      ctx.fillRect(p.x + 2, 0, PIPE_W - 4, p.top - 2);
      ctx.fillStyle = "#2d8a3e";
      ctx.fillRect(p.x, p.top - capH, PIPE_W + 4, capH);
      ctx.strokeRect(p.x, p.top - capH, PIPE_W + 4, capH);

      ctx.fillRect(p.x, p.bottom, PIPE_W, skyH - p.bottom);
      ctx.strokeRect(p.x, p.bottom, PIPE_W, skyH - p.bottom);
      ctx.fillRect(p.x + 2, p.bottom + 2, PIPE_W - 4, skyH - p.bottom - 2);
      ctx.fillRect(p.x, p.bottom, PIPE_W + 4, capH);
      ctx.strokeRect(p.x, p.bottom, PIPE_W + 4, capH);
    }

    function drawBird(by: number, vy: number) {
      const ctx = context;
      const bx = W / 2 - BIRD_W / 2;
      const wingTilt = Math.max(-0.4, Math.min(0.4, vy * 0.08));

      ctx.save();
      ctx.translate(bx + BIRD_W / 2, by + BIRD_H / 2);
      ctx.rotate(wingTilt);
      ctx.translate(-(bx + BIRD_W / 2), -(by + BIRD_H / 2));

      ctx.fillStyle = "#f4d03f";
      ctx.strokeStyle = "#d4a017";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(bx + BIRD_W / 2, by + BIRD_H / 2, BIRD_W / 2, BIRD_H / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#e67e22";
      ctx.beginPath();
      ctx.moveTo(bx + BIRD_W - 2, by + BIRD_H / 2);
      ctx.lineTo(bx + BIRD_W + 8, by + BIRD_H / 2 - 3);
      ctx.lineTo(bx + BIRD_W + 8, by + BIRD_H / 2 + 3);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#bf6516";
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(bx + BIRD_W - 6, by + 5, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#222";
      ctx.beginPath();
      ctx.arc(bx + BIRD_W - 5, by + 5, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    const draw = () => {
      const ctx = context;
      const g = gameRef.current;
      if (!g) return;

      drawSky();

      if (state === "idle") {
        drawBird(H / 2 - BIRD_H / 2, 0);
        drawGround();
        ctx.fillStyle = "rgba(0,0,0,0.45)";
        ctx.fillRect(0, 0, W, skyH);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 16px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("FLAPPY BIRD", W / 2, skyH / 2 - 16);
        ctx.font = "12px system-ui, sans-serif";
        ctx.fillText("Click or press Space to start", W / 2, skyH / 2 + 4);
        rafId = requestAnimationFrame(draw);
        return;
      }

      if (state === "playing") {
        g.birdVy += GRAVITY;
        g.birdY += g.birdVy;

        if (g.pipes.length === 0 || g.pipes[g.pipes.length - 1].x < W - 160) {
          const gapY = 50 + Math.random() * (skyH - PIPE_GAP - 80);
          g.pipes.push({
            x: W,
            top: gapY,
            bottom: gapY + PIPE_GAP,
            scored: false
          });
        }

        for (let i = g.pipes.length - 1; i >= 0; i--) {
          const p = g.pipes[i];
          p.x -= PIPE_SPEED;
          if (p.x + PIPE_W < 0) g.pipes.splice(i, 1);

          if (!p.scored && W / 2 > p.x + PIPE_W) {
            p.scored = true;
            scoreDisplayRef.current += 1;
            setScore((s) => s + 1);
          }

          const bx = W / 2 - BIRD_W / 2;
          const by = g.birdY;
          const hit =
            bx + BIRD_W > p.x &&
            bx < p.x + PIPE_W &&
            (by < p.top || by + BIRD_H > p.bottom);
          const out = by < 0 || by + BIRD_H > skyH;
          if (hit || out) {
            setState("over");
          }
        }

        g.pipes.forEach((p) => drawPipe(p));
        drawBird(g.birdY, g.birdVy);
        drawGround();

        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.font = "bold 24px system-ui, sans-serif";
        ctx.textAlign = "center";
        const scoreStr = String(scoreDisplayRef.current);
        ctx.strokeText(scoreStr, W / 2, 32);
        ctx.fillText(scoreStr, W / 2, 32);
      }

      if (state === "over") {
        g.pipes.forEach((p) => drawPipe(p));
        drawBird(g.birdY, 0);
        drawGround();
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, W, skyH);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 14px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", W / 2, skyH / 2 - 14);
        ctx.fillText(`Score: ${scoreDisplayRef.current}`, W / 2, skyH / 2 + 4);
        ctx.font = "11px system-ui, sans-serif";
        ctx.fillText("Click or Space to restart", W / 2, skyH / 2 + 24);
        rafId = requestAnimationFrame(draw);
        return;
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      if (e.repeat) return;
      if (state === "idle") startGame();
      else if (state === "playing") gameRef.current!.birdVy = FLAP;
      else if (state === "over") startGame();
    };

    const onClick = () => {
      if (state === "idle") startGame();
      else if (state === "playing") gameRef.current!.birdVy = FLAP;
      else if (state === "over") startGame();
    };

    window.addEventListener("keydown", onKey);
    canvas.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("click", onClick);
    };
  }, [state, startGame]);

  return (
    <div className="mt-3 overflow-hidden rounded-xl border-2 border-amber-900/50 bg-sky-200 shadow-lg">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="block w-full cursor-pointer"
        style={{ aspectRatio: W / H }}
        tabIndex={0}
        aria-label="Flappy Bird: press Space or click to flap"
      />
    </div>
  );
}
