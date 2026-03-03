import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Rate Your Professor – MVP",
  description:
    "A lightweight Rate Your Professor prototype built with Next.js 14 and Tailwind CSS."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-gray-100 font-sans">
        <div className="grid min-h-screen grid-rows-[auto,1fr]">
          <header className="border-b border-gray-800 bg-surface">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <div className="text-sm uppercase tracking-[0.2em] text-gray-400">
                Rate Your Professor
              </div>
              <nav className="flex gap-4 text-xs text-gray-400">
                <a href="/" className="hover:text-accent transition-colors">
                  Home
                </a>
                <a
                  href="/professors"
                  className="hover:text-accent transition-colors"
                >
                  Professors
                </a>
              </nav>
            </div>
          </header>
          <main className="bg-background">
            <div className="mx-auto max-w-6xl px-6 py-8">
              <div className="grid grid-cols-12 gap-6">{children}</div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

