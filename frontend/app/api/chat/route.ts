import OpenAI from "openai";
import { portfolio } from "@/lib/content";
import { buildSystemPrompt } from "@/lib/persona";

// Node runtime (the openai SDK + streaming need it); always dynamic; allow up
// to 30s for a streamed reply.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MODEL = process.env.CHAT_MODEL || "gpt-5.4-mini";

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const incoming: Msg[] = Array.isArray(body?.messages) ? body.messages : [];

  const messages = incoming
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .slice(-20);

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return Response.json(
      { error: "Last message must be from the user." },
      { status: 400 }
    );
  }

  const system = buildSystemPrompt(portfolio);
  const openai = new OpenAI();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      try {
        const completion = await openai.chat.completions.create({
          model: MODEL,
          max_completion_tokens: 1024,
          stream: true,
          messages: [{ role: "system", content: system }, ...messages],
        });
        for await (const chunk of completion) {
          const delta = chunk.choices?.[0]?.delta?.content;
          if (delta) send({ text: delta });
        }
        send({ done: true });
      } catch (err) {
        console.error("[chat] error:", err);
        send({
          error: "The assistant is unavailable right now. Please try again.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
