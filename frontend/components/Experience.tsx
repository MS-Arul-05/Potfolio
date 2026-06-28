import Section from "./Section";
import { portfolio } from "@/lib/content";

export default function Experience() {
  if (!portfolio.experience?.length) return null;
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <ol className="relative border-l border-line pl-6">
        {portfolio.experience.map((e) => (
          <li key={`${e.company}-${e.role}`} className="mb-10 last:mb-0">
            <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-white" />
            <p className="text-sm font-medium text-muted">
              {e.start} – {e.end}
            </p>
            <h3 className="mt-1 text-lg font-semibold">
              {e.role} · <span className="text-accent">{e.company}</span>
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              {e.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
