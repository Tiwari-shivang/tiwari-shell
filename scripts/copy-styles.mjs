import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const source = resolve("src/styles/layout.css");
const target = resolve("dist/styles/layout.css");

if (!existsSync(source)) {
  throw new Error(`Missing source style file: ${source}`);
}

mkdirSync(dirname(target), { recursive: true });
cpSync(source, target);
