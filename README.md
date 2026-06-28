# AI Portfolio — Arul MS

An immersive, AI-powered personal portfolio. An AI guide ("ARIA") welcomes
visitors, narrates Arul's journey, and answers questions in a streaming chat —
powered by OpenAI. **Single Next.js app at the repo root — Vercel auto-detects
and deploys it with zero configuration.**

## Architecture

```
Browser ──► Next.js app (Vercel)
              ├─ UI (static, SEO-friendly, clean/minimal light)
              └─ API routes (serverless)
                   ├─ /api/chat     → streams OpenAI chat (SSE)
                   └─ /api/contact  → saves to MongoDB (optional)
```

Everything is one Next.js project. The chat and contact endpoints are App
Router route handlers, so there is **no separate backend server** — it all runs
as Vercel serverless functions.

## Project structure

```
app/
  page.tsx            # the portfolio (all sections)
  api/chat/route.ts   # streaming OpenAI chat
  api/contact/route.ts# contact form → MongoDB
components/           # UI sections + chat widget
lib/
  content.ts          # loads portfolio.json (typed)
  persona.ts          # builds the bot's system prompt
  db.ts               # MongoDB helper
data/portfolio.json   # SINGLE SOURCE OF TRUTH — edit this for all content
public/               # images + resume PDF
```

## Sections

Landing · AI Avatar · Voice intro · About · Skills · Projects · Research ·
Services · Experience · Education & Certifications · Resume · Contact · AI Chat.

## Run locally

```bash
npm install
cp .env.local.example .env.local   # add OPENAI_API_KEY
npm run dev                        # http://localhost:3000
```

## Editing content

1. Edit **data/portfolio.json** — replace any value.
2. Drop assets in **public/images/** and your resume PDF in **public/files/**.
3. The homepage and the AI bot both update automatically.

## Environment variables

Set these in `.env.local` locally, and in the Vercel project settings for
production:

| Key | Required | Purpose |
|-----|----------|---------|
| `OPENAI_API_KEY` | ✅ | OpenAI API key (powers the chat) |
| `CHAT_MODEL` | — | Defaults to `gpt-5.4-mini` |
| `MONGODB_URI` | — | Optional; without it, contact messages are logged, not stored |
| `MONGODB_DB` | — | Database name (default `ms_portfolio`) |

## Deploy to Vercel

1. Push to GitHub (done).
2. Vercel → **New Project** → import the repo. It auto-detects Next.js at the
   root — **no Root Directory setting needed.**
3. Add env var **`OPENAI_API_KEY`** (at minimum).
4. Deploy. UI and API ship together.

> `/api/chat` streams on the Node serverless runtime with `maxDuration = 30s`,
> plenty for short chat replies.
