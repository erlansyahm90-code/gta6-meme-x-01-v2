// gta6-meme-x-01-v2 entry program (Node 22, standard library only).
//
// The entry itself is an X post, named in POST.json at the repository root.
// This program only copies that file into the output directory, where the
// gate reads it. The house reads the post itself from X; nothing written
// here is judged.
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
try {
  copyFileSync(join(botDir, "POST.json"), join(outDir, "POST.json"));
} catch (err) {
  console.error(
    `POST.json could not be copied from ${botDir}: ${(err as Error).message}`,
  );
  process.exit(1);
}
