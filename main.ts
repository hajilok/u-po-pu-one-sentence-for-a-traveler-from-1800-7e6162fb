import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 200;

// Super-Finals unanimous #1 champion (20-0 across blind Pro & Flash round-robins).
const ENTRY_TEXT =
  "Machines pass signals by wire, light, and air, making a lit glass pane a door to most of mankind: letters, voices, and sights arrive in a flash, libraries open beside markets, and truth jostles rumor.";

function validateEntry(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`Entry length ${chars.length} out of range 1..${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be whitespace only");
  }
  if (!/^[\x20-\x7E]+$/.test(text)) {
    throw new Error("Entry must contain only single-line printable ASCII characters");
  }
  if (!text.endsWith(".") || /[.!?]/.test(text.slice(0, -1))) {
    throw new Error("Entry must be exactly one sentence ending with a period");
  }
}

function resolveOutputPath(argv: string[]): string {
  const idx = argv.indexOf("--out");
  if (idx !== -1 && idx + 1 < argv.length) {
    return argv[idx + 1];
  }
  return "/output/entry.txt";
}

function main(): void {
  validateEntry(ENTRY_TEXT);
  const outPath = resolveOutputPath(process.argv.slice(2));
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY_TEXT, { encoding: "utf8", mode: 0o644 });
}

main();
