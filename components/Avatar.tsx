"use client";

import { portfolio } from "@/lib/content";

// Hero portrait — a framed photo that melts into the page with an ambient
// electric-blue glow. The glow intensifies and an equalizer appears while the
// voice intro is speaking.
export default function Avatar({ speaking = false }: { speaking?: boolean }) {
  const { person } = portfolio;

  return (
    <div className="relative w-full max-w-sm">
      {/* ambient blue glow behind the frame */}
      <div
        className={`pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-brand/25 blur-3xl transition-opacity duration-700 ${
          speaking ? "opacity-100" : "opacity-50"
        }`}
      />

      {/* gradient border frame */}
      <div
        className={`relative rounded-[1.9rem] bg-gradient-to-br from-brand/80 via-sky-400/40 to-transparent p-[1.5px] shadow-2xl transition-all duration-500 ${
          speaking ? "shadow-[0_0_60px_-10px] shadow-brand/60" : ""
        }`}
      >
        <div className="relative overflow-hidden rounded-[1.8rem] bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ms_profile.png"
            alt={`${person.name} — ${person.title}`}
            className="h-[26rem] w-full object-cover object-[50%_22%]"
          />

          {/* fade the bottom of the photo into the page background */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-parchment via-parchment/70 to-transparent" />

          {/* subtle blue sheen along the top edge */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand/15 to-transparent" />

          {/* name plate */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
            <div>
              <p className="text-base font-semibold tracking-tight text-ink">
                {person.name}
              </p>
              <p className="text-sm font-medium text-brand">{person.title}</p>
            </div>

            {/* speaking equalizer */}
            {speaking && (
              <div className="flex items-end gap-1 pb-1" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-brand animate-pulse"
                    style={{
                      height: `${8 + (i % 2 === 0 ? 14 : 6)}px`,
                      animationDelay: `${i * 120}ms`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* floating availability pill */}
      <div className="absolute -left-3 top-6 flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-1.5 text-xs font-medium text-ink shadow-lg backdrop-blur md:-left-6">
        <span className="relative grid h-2 w-2 place-items-center">
          <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Open to AI/ML roles
      </div>
    </div>
  );
}
