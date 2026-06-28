import { MongoClient, Db } from "mongodb";

// In serverless (Vercel), cache the connection across warm invocations on the
// global object so we don't reconnect on every request.
type Cache = { client: MongoClient; db: Db };
const g = globalThis as unknown as { _mongo?: Cache };

export async function getDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null; // no DB configured → run in log-only mode
  if (g._mongo) return g._mongo.db;

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "ms_portfolio");
  g._mongo = { client, db };
  return db;
}

export async function saveContact(message: {
  name: string;
  email: string;
  message: string;
}) {
  const db = await getDb();
  const doc = { ...message, createdAt: new Date() };
  if (!db) {
    console.log("[contact] (no DB configured) received:", doc);
    return { stored: false };
  }
  await db.collection("contacts").insertOne(doc);
  return { stored: true };
}
