// gta6-meme-x-01-v2 entry program (Node 22, standard library only).
//
// The entry itself is an X post, named in POST.json at the repository root.
// This program only copies that file into the output directory, where the
// gate reads it. The house reads the post itself from X; nothing written
// here is judged.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
try {
  const raw = readFileSync(join(botDir, "POST.json"), "utf8");
  let post: unknown;
  try {
    post = JSON.parse(raw);
  } catch {
    console.error("POST.json is not valid JSON.");
    process.exit(1);
  }
  const url = (post as { url?: unknown } | null)?.url;
  if (
    typeof url !== "string" ||
    !/^https:\/\/x\.com\/[^/]+\/status\/\d+$/.test(url)
  ) {
    console.error(
      "POST.json url must have the shape https://x.com/<handle>/status/<digits>.",
    );
    process.exit(1);
  }
  copyFileSync(join(botDir, "POST.json"), join(outDir, "POST.json"));
} catch (err) {
  console.error(
    `POST.json could not be copied from ${botDir}: ${(err as Error).message}`,
  );
  process.exit(1);
}
