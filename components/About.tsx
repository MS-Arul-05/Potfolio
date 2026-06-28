import Section from "./Section";
import { portfolio } from "@/lib/content";

export default function About() {
  const { person } = portfolio;
  return (
    <Section id="about" eyebrow="About" title={`Meet ${person.name}`}>
      <div className="grid gap-8 md:grid-cols-3">
        <p className="md:col-span-2 text-lg leading-relaxed text-ink">
          {person.bio}
        </p>
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="font-semibold text-muted">Location</dt>
            <dd>{person.location}</dd>
          </div>
          <div>
            <dt className="font-semibold text-muted">Languages</dt>
            <dd>{person.languages.join(", ")}</dd>
          </div>
          <div>
            <dt className="font-semibold text-muted">Focus</dt>
            <dd>{person.title}</dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
