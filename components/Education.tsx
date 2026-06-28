import Section from "./Section";
import { portfolio } from "@/lib/content";

export default function Education() {
  const { education, certifications } = portfolio;
  if (!education?.length && !certifications?.length) return null;

  return (
    <Section id="education" eyebrow="Education" title="Education & certifications">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Education
          </h3>
          <div className="mt-4 space-y-4">
            {education.map((e) => (
              <div key={e.degree} className="card">
                <h4 className="font-semibold">{e.degree}</h4>
                <p className="mt-1 text-accent">{e.school}</p>
                <p className="mt-1 text-sm text-muted">
                  {e.period} · {e.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Certifications
          </h3>
          <ul className="mt-4 space-y-3">
            {certifications.map((c) => (
              <li
                key={c.name}
                className="flex items-baseline justify-between gap-4 rounded-xl border border-line px-4 py-3"
              >
                <span>
                  <span className="font-medium">{c.name}</span>
                  <span className="text-muted"> · {c.issuer}</span>
                </span>
                <span className="shrink-0 text-sm text-muted">{c.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
