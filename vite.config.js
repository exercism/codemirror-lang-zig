import { defineConfig } from "vite";
import lezer from "unplugin-lezer/vite";

// unplugin-lezer resolves its own virtual `\0….grammar.terms` ids again as
// relative paths, which breaks importing the grammar's terms (see
// src/tokens.ts). Keep those ids as they are.
const keepLezerTermsIds = {
  name: "keep-lezer-terms-ids",
  enforce: "pre",
  resolveId(source) {
    return source.startsWith("\0") && source.endsWith(".grammar.terms")
      ? source
      : null;
  },
};

export default defineConfig({
  plugins: [keepLezerTermsIds, lezer()],
});
