import Section from "./Section";
import { portfolio } from "@/lib/content";

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools & technologies"
      lead="The stack I reach for to design, build, and ship intelligent products."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {portfolio.skills.map((g) => (
          <div key={g.group} className="card">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {g.group}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
