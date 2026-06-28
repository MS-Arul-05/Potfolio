"use client";

import { portfolio } from "@/lib/content";

// Avatar uses Arul's illustrated portrait. The pulse ring animates while the
// voice intro is speaking.
export default function Avatar({ speaking = false }: { speaking?: boolean }) {
  const { person } = portfolio;
  return (
    <div className="relative grid place-items-center">
      {speaking && (
        <span className="absolute h-80 w-80 rounded-full bg-accent/20 animate-pulseRing md:h-96 md:w-96" />
      )}
      <div
        className={`relative h-72 w-72 overflow-hidden rounded-full bg-accentSoft ring-[6px] ring-white shadow-2xl transition md:h-80 md:w-80 ${
          speaking ? "ring-accent/50" : ""
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={person.avatarImage}
          alt={`${person.name} avatar`}
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}
