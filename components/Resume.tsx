import Section from "./Section";
import { portfolio } from "@/lib/content";

export default function Resume() {
  const { person } = portfolio;
  return (
    <Section
      id="resume"
      eyebrow="Resume"
      title="Want the full story?"
      lead="Download a one-page summary of experience, skills, and education."
    >
      <a
        href={person.resumeFile}
        download
        className="btn-primary"
        target="_blank"
        rel="noreferrer"
      >
        ↓ Download resume (PDF)
      </a>
      <p className="mt-3 text-sm text-muted">
        Drop your PDF at <code>frontend/public{person.resumeFile}</code>.
      </p>
    </Section>
  );
}
