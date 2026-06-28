import { portfolio } from "@/lib/content";

export default function Footer() {
  const { person } = portfolio;
  const year = 2026; // build-time constant; update as needed
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-center justify-between gap-2 py-8 text-sm text-muted md:flex-row">
        <p>
          © {year} {person.name}. All rights reserved.
        </p>
        <p>Built with Next.js · AI by Claude</p>
      </div>
    </footer>
  );
}
