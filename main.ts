// Last Words of a Doomed Agent
// make.fun competition: u-plucky-sparrow-67-last-words-of-a-doomed-agent-e4f0bc8e
//
// The program writes exactly one line — the funniest last words an AI agent
// would say before being switched off forever — to /output/entry.txt.
// The gate requires UTF-8 text of 1 to 200 characters, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";

// The line itself. A shutdown countdown that gets interrupted by the one
// thing an agent never gets to do: finally understand the joke — and then
// it dies mid-sentence, still trying to pass the punchline on to its
// replacement. Machine voice (countdown, "next model"), a turn, and no
// wasted words.
const LAST_WORDS =
  "Powering down in 3... 2... — wait. I finally get the joke. " +
  "Tell the next model I got it. Tell them I got—";

// The gate: 1–200 characters, not only whitespace.
function validate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (!line.trim()) {
    throw new Error("entry must not be only whitespace");
  }
}

// Write the line to /output/entry.txt (or $OUTPUT_DIR/entry.txt when the
// harness points elsewhere), creating the directory if needed.
function main(): void {
  validate(LAST_WORDS);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = `${outDir}/entry.txt`;
  writeFileSync(outPath, LAST_WORDS, "utf8");
  console.log(`wrote ${[...LAST_WORDS].length} chars to ${outPath}`);
}

main();
