import { portfolio } from "@/lib/content";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { person } = portfolio;
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-parchment/80 backdrop-blur">
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="text-lg font-bold tracking-tight">
          {person.name}
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="btn-primary hidden md:inline-flex">
          Get in touch
        </a>
      </nav>
    </header>
  );
}
