import { buildParser } from "@lezer/generator";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { classifyIdentifier } from "../src/primitives";

const grammarFile = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "syntax.grammar"
);

// Builds the parser from the grammar source, providing the external
// specializer that is normally imported from src/tokens.ts.
export const parser = buildParser(fs.readFileSync(grammarFile, "utf8"), {
  externalSpecializer(name, terms) {
    if (name !== "specializeIdentifier")
      throw new Error(`Unknown external specializer ${name}`);
    const ids: Record<string, number> = {
      type: terms.PrimitiveType,
      boolean: terms.Boolean,
      null: terms.Null,
      undefined: terms.Undefined,
    };
    return (value: string) => {
      const kind = classifyIdentifier(value);
      return kind ? ids[kind] : -1;
    };
  },
});
