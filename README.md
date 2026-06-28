# AI Portfolio — Arul M

An immersive, AI-powered personal portfolio. An AI robot guide ("ARIA") welcomes
visitors, narrates Arul's journey, and answers questions in a streaming chat —
powered by Claude.

## Architecture

```
Browser (Next.js)  ──►  Backend (Express)  ──►  Claude API
       │                       │
       │                       └──►  MongoDB (contact + optional transcripts)
       └── static, SEO-friendly, clean/minimal light design
```

- **frontend/** — Next.js (App Router) + Tailwind. Clean, minimal, responsive, SEO-ready.
- **backend/** — Express service. Streams Claude chat (SSE), stores contact submissions in MongoDB.
- **frontend/data/portfolio.json** — the single source of truth. Edit this one file
  to fill in all of Arul's real content; both the UI and the bot read from it.

## Sections (epics)

Landing · AI Avatar · Voice intro · About · Skills · Projects · Research ·
Services · Experience · Resume · Contact · AI Chat.

## Quick start

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env       # add your ANTHROPIC_API_KEY (and MONGODB_URI if you have one)
npm run dev                # http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:4000
npm run dev                        # http://localhost:3000
```

## Adding your data

1. Edit **frontend/data/portfolio.json** — replace every `TODO` value.
2. Drop assets in **frontend/public/images/** (avatar, photo, project images)
   and your resume PDF in **frontend/public/files/**.
3. That's it — the homepage and the AI bot both update automatically.

## Configuration

| Where | Key | Purpose |
|-------|-----|---------|
| backend/.env | `ANTHROPIC_API_KEY` | Claude API key (required) |
| backend/.env | `CHAT_MODEL` | Defaults to `claude-opus-4-8`; set `claude-haiku-4-5` for cheaper/faster |
| backend/.env | `MONGODB_URI` | Optional; without it, contact messages are logged, not stored |
| backend/.env | `CORS_ORIGINS` | Allowed frontend origins |
| frontend/.env.local | `NEXT_PUBLIC_API_URL` | URL of the backend service |

## Deploy

- **Frontend** → Vercel (or any Node host). Set `NEXT_PUBLIC_API_URL` to the deployed backend.
- **Backend** → Render / Railway / Fly / a VM. Set env vars; expose the port.
- Point `CORS_ORIGINS` at the deployed frontend origin.
