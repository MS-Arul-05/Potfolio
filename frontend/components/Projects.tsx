import Section from "./Section";
import { portfolio } from "@/lib/content";

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      lead="A few things I've built. Each one solved a real problem end to end."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {portfolio.projects.map((p) => (
          <article key={p.name} className="card flex flex-col">
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="mt-2 flex-1 text-muted">{p.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-4 text-sm font-semibold">
              {p.link ? (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  Live →
                </a>
              ) : null}
              {p.repo ? (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  Code →
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
