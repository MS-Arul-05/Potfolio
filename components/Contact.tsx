"use client";

import { useState } from "react";
import Section from "./Section";
import { portfolio } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const { social } = portfolio;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch(`/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      lead="Have a role or a project in mind? Send a message and I'll get back to you."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-accent"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Your email"
            className="w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-accent"
          />
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Your message"
            className="w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "sent" && (
            <p className="text-sm font-medium text-green-600">
              Thanks! Your message was sent.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-red-600">
              Something went wrong. Email me directly instead.
            </p>
          )}
        </form>

        <ul className="space-y-3 text-sm">
          {social.email && (
            <li>
              <span className="font-semibold">Email:</span>{" "}
              <a className="text-accent hover:underline" href={`mailto:${social.email}`}>
                {social.email}
              </a>
            </li>
          )}
          {social.linkedin && (
            <li>
              <span className="font-semibold">LinkedIn:</span>{" "}
              <a className="text-accent hover:underline" href={social.linkedin} target="_blank" rel="noreferrer">
                {social.linkedin}
              </a>
            </li>
          )}
          {social.github && (
            <li>
              <span className="font-semibold">GitHub:</span>{" "}
              <a className="text-accent hover:underline" href={social.github} target="_blank" rel="noreferrer">
                {social.github}
              </a>
            </li>
          )}
          {social.phone && (
            <li>
              <span className="font-semibold">Phone:</span> {social.phone}
            </li>
          )}
        </ul>
      </div>
    </Section>
  );
}
