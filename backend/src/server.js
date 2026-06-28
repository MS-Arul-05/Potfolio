import "dotenv/config";
import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";

import { loadPortfolio } from "./data.js";
import { buildSystemPrompt } from "./persona.js";
import { saveContact } from "./db.js";

const app = express();
app.use(express.json());

const origins = (process.env.CORS_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());
app.use(cors({ origin: origins }));

const MODEL = process.env.CHAT_MODEL || "claude-opus-4-8";
const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY from env

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, model: MODEL });
});

// Returns the bot's greeting + name so the frontend can render it without
// duplicating the data.
app.get("/api/bot", (_req, res) => {
  const p = loadPortfolio();
  res.json({ name: p.bot.name, greeting: p.bot.greeting });
});

/**
 * Streaming chat endpoint (Server-Sent Events).
 * Body: { messages: [{ role: "user" | "assistant", content: string }, ...] }
 * Streams the assistant reply as `data: {"text": "..."}` SSE chunks,
 * then a final `data: {"done": true}`.
 */
app.post("/api/chat", async (req, res) => {
  const incoming = Array.isArray(req.body?.messages) ? req.body.messages : [];
  // Keep only well-formed turns and cap history length.
  const messages = incoming
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .slice(-20);

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "Last message must be from the user." });
  }

  const system = buildSystemPrompt(loadPortfolio());

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  try {
    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 1024,
      system,
      messages,
    });

    stream.on("text", (delta) => {
      res.write(`data: ${JSON.stringify({ text: delta })}\n\n`);
    });

    await stream.finalMessage();
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    console.error("[chat] error:", err?.message || err);
    // If we haven't streamed yet, status is still settable on most paths.
    res.write(
      `data: ${JSON.stringify({
        error: "The assistant is unavailable right now. Please try again.",
      })}\n\n`
    );
    res.end();
  }
});

// Contact form submission
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email and message are required." });
  }
  try {
    const result = await saveContact({ name, email, message });
    res.json({ ok: true, ...result });
  } catch (err) {
    console.error("[contact] error:", err?.message || err);
    res.status(500).json({ error: "Could not save your message. Please try again." });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT} (model: ${MODEL})`);
});
