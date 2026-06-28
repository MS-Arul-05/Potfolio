import { MongoClient } from "mongodb";

let client = null;
let db = null;

// Lazily connect to MongoDB. If MONGODB_URI is not set, the app runs in
// "no-db" mode: contact submissions are logged to the console instead of stored.
export async function getDb() {
  if (db) return db;
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(process.env.MONGODB_DB || "ms_portfolio");
  console.log("[db] connected to MongoDB");
  return db;
}

export async function saveContact(message) {
  const database = await getDb();
  const doc = { ...message, createdAt: new Date() };
  if (!database) {
    console.log("[contact] (no DB configured) received:", doc);
    return { stored: false };
  }
  await database.collection("contacts").insertOne(doc);
  return { stored: true };
}
