import "./globals.css";
import type { ReactNode } from "react";
import { TwinklingStars } from "../src/components/canvas/TwinklingStars";
import { CommandPalette } from "../src/components/dom/CommandPalette";
import { FloatingQuickAction } from "../src/components/dom/FloatingQuickAction";

export const metadata = {
  title: "Rate Your Professor – MVP",
  description:
    "A lightweight Rate Your Professor prototype built with Next.js 14 and Tailwind CSS."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-gray-100 font-sans">
        <TwinklingStars />
        <CommandPalette />
        <FloatingQuickAction />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black via-background to-black opacity-90" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_55%)]" />
        <div className="grid min-h-screen grid-rows-[auto,1fr]">
          <header className="border-b border-gray-800/80 bg-surface/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <div className="text-sm uppercase tracking-[0.2em] text-gray-400">
                Rate Your Professor
              </div>
              <nav className="flex items-center gap-4 text-xs text-gray-400">
                <a href="/" className="hover:text-accent transition-colors">
                  Home
                </a>
                <a
                  href="/professors"
                  className="hover:text-accent transition-colors"
                >
                  Professors
                </a>
                <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-gray-700 bg-surfaceMuted px-1.5 py-0.5 font-mono text-[10px] text-gray-500">
                  ⌘K
                </kbd>
              </nav>
            </div>
          </header>
          <main className="bg-transparent">
            <div className="mx-auto max-w-6xl px-6 py-8">
              <div className="grid grid-cols-12 gap-6">{children}</div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

