import data from "@/data/portfolio.json";

export type Portfolio = {
  person: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    location: string;
    languages: string[];
    avatarImage: string;
    photo: string;
    resumeFile: string;
  };
  bot: { name: string; greeting: string; tone: string };
  social: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    x: string;
    website: string;
  };
  skills: { group: string; items: string[] }[];
  projects: {
    name: string;
    summary: string;
    tech: string[];
    link: string;
    repo: string;
    image: string;
  }[];
  research: {
    title: string;
    venue: string;
    year: string;
    link: string;
    summary: string;
  }[];
  services: { name: string; description: string }[];
  experience: {
    company: string;
    role: string;
    start: string;
    end: string;
    highlights: string[];
  }[];
  education: {
    degree: string;
    school: string;
    period: string;
    detail: string;
  }[];
  certifications: { name: string; issuer: string; year: string }[];
};

export const portfolio = data as unknown as Portfolio;
