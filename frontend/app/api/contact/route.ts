import { saveContact } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, email, message } = body || {};

  if (!name || !email || !message) {
    return Response.json(
      { error: "name, email and message are required." },
      { status: 400 }
    );
  }

  try {
    const result = await saveContact({ name, email, message });
    return Response.json({ ok: true, ...result });
  } catch (err) {
    console.error("[contact] error:", err);
    return Response.json(
      { error: "Could not save your message. Please try again." },
      { status: 500 }
    );
  }
}
