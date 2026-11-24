import { PrimitiveType, Boolean, Null, Undefined } from "./syntax.grammar.terms";
import { classifyIdentifier } from "./primitives";

const terms = { type: PrimitiveType, boolean: Boolean, null: Null, undefined: Undefined };

export function specializeIdentifier(name: string): number {
  const kind = classifyIdentifier(name);
  return kind ? terms[kind] : -1;
}
