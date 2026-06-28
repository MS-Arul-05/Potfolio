"use client";

import Section from "./Section";
import { portfolio } from "@/lib/content";
import LogoLoop from "./LogoLoop";

// Maps a skill name to its Devicon icon path (served from jsDelivr).
// Anything not listed here renders as a text-only chip.
const ICONS: Record<string, string> = {
  Python: "python/python-original",
  JavaScript: "javascript/javascript-original",
  Java: "java/java-original",
  C: "c/c-original",
  "Node.js": "nodejs/nodejs-original",
  "React.js": "react/react-original",
  HTML5: "html5/html5-original",
  CSS3: "css3/css3-original",
  "Tailwind CSS": "tailwindcss/tailwindcss-original",
  Figma: "figma/figma-original",
  "Express.js": "express/express-original",
  FastAPI: "fastapi/fastapi-original",
  TensorFlow: "tensorflow/tensorflow-original",
  Keras: "keras/keras-original",
  "Scikit-learn": "scikitlearn/scikitlearn-original",
  Pandas: "pandas/pandas-original",
  NumPy: "numpy/numpy-original",
  LangChain: "https://cdn.simpleicons.org/langchain",
  n8n: "https://cdn.simpleicons.org/n8n",
  AWS: "amazonwebservices/amazonwebservices-original-wordmark",
  Docker: "docker/docker-original",
  Git: "git/git-original",
  GitHub: "github/github-original",
  MySQL: "mysql/mysql-original",
  MongoDB: "mongodb/mongodb-original",
};

const iconUrl = (slug: string) =>
  slug.startsWith("http")
    ? slug
    : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}.svg`;

// Logos for the scrolling marquee under the Skills grid.
const loopLogos = Object.entries(ICONS).map(([title, slug]) => ({
  src: iconUrl(slug),
  alt: title,
  title,
}));

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
                <li key={item} className="chip inline-flex items-center gap-1.5">
                  {ICONS[item] && (
                    <img
                      src={iconUrl(ICONS[item])}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-4 w-4 shrink-0"
                      onError={(e) => {
                        // Hide gracefully if a logo isn't available.
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative mt-12 h-[72px] overflow-hidden">
        <LogoLoop
          logos={loopLogos}
          speed={80}
          direction="left"
          logoHeight={40}
          gap={56}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#f2e9e4"
          ariaLabel="Technologies I work with"
        />
      </div>
    </Section>
  );
}
