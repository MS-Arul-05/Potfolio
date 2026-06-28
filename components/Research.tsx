import Section from "./Section";
import { portfolio } from "@/lib/content";

export default function Research() {
  if (!portfolio.research?.length) return null;
  return (
    <Section
      id="research"
      eyebrow="Research"
      title="Publications & writing"
      lead="Peer-reviewed work and contributions to the field."
    >
      <div className="space-y-4">
        {portfolio.research.map((r) => (
          <article
            key={r.title}
            className="card flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="text-sm text-muted">
                {r.venue} · {r.year}
              </p>
              <p className="mt-1 text-muted">{r.summary}</p>
            </div>
            {r.link ? (
              <a
                href={r.link}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-sm font-semibold text-accent hover:underline"
              >
                Read →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}
