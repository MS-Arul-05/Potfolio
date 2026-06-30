"use client";

import { useState } from "react";
import { portfolio } from "@/lib/content";
import Avatar from "./Avatar";

export default function Hero() {
  const { person, bot } = portfolio;
  const [speaking, setSpeaking] = useState(false);

  function narrate() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const text = `${bot.greeting} ${person.name} is a ${person.title}. ${person.bio}`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    synth.speak(utter);
  }

  return (
    <section id="top" className="border-b border-line bg-gradient-to-b from-graphite via-coal to-parchment">
      <div className="container-x grid items-center gap-12 py-24 md:grid-cols-2 md:py-32">
        <div className="animate-fadeUp">
          <span className="chip">AI-powered portfolio</span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            {person.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-accent">{person.title}</p>
          <p className="lead">{person.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              View work
            </a>
            <button onClick={narrate} className="btn-ghost" type="button">
              {speaking ? "◼ Stop narration" : "▶ Hear my intro"}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 animate-fadeUp">
          <Avatar speaking={speaking} />
          <div className="max-w-xs rounded-2xl border border-line bg-surface p-4 text-center text-sm text-muted">
            <span className="font-semibold text-ink">{bot.name}:</span>{" "}
            {bot.greeting}
          </div>
        </div>
      </div>
    </section>
  );
}
