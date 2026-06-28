import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Single source of truth lives in the frontend so there is exactly one file to edit.
const DATA_PATH = join(__dirname, "../../frontend/data/portfolio.json");

export function loadPortfolio() {
  return JSON.parse(readFileSync(DATA_PATH, "utf8"));
}
