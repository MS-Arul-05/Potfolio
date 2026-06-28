import Section from "./Section";
import { portfolio } from "@/lib/content";

export default function Services() {
  if (!portfolio.services?.length) return null;
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="How I can help"
      lead="Ways we can work together."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {portfolio.services.map((s, i) => (
          <div key={s.name} className="card">
            <span className="text-2xl font-bold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg font-semibold">{s.name}</h3>
            <p className="mt-2 text-muted">{s.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
