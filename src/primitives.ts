// Primitive type names, see lib/std/zig/primitives.zig in the Zig source.
// `anyframe` is omitted as it is parsed as a keyword.
const primitiveTypes = new Set([
  "anyerror",
  "anyopaque",
  "bool",
  "c_char",
  "c_int",
  "c_long",
  "c_longdouble",
  "c_longlong",
  "c_short",
  "c_uint",
  "c_ulong",
  "c_ulonglong",
  "c_ushort",
  "comptime_float",
  "comptime_int",
  "f16",
  "f32",
  "f64",
  "f80",
  "f128",
  "isize",
  "noreturn",
  "type",
  "usize",
  "void",
]);

export type PrimitiveKind = "type" | "boolean" | "null" | "undefined";

export function classifyIdentifier(name: string): PrimitiveKind | null {
  if (name === "true" || name === "false") return "boolean";
  if (name === "null") return "null";
  if (name === "undefined") return "undefined";
  // Arbitrary bit-width integer types such as u8, i32 and u7
  if (primitiveTypes.has(name) || /^[iu][0-9]+$/.test(name)) return "type";
  return null;
}
