import { parser } from "./syntax.grammar";
import {
  LRLanguage,
  LanguageSupport,
  delimitedIndent,
  continuedIndent,
  foldInside,
  foldNodeProp,
  indentNodeProp,
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

// Field and variable names may also be primitive names such as `type`
const names = (parent: string) =>
  ["Identifier", "PrimitiveType", "Boolean", "Null", "Undefined"]
    .map((name) => `${parent}/${name}`)
    .join(" ");

export const zigLanguage = LRLanguage.define({
  name: "zig",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        "Block ContainerBody SwitchBody InitList": delimitedIndent({ closing: "}" }),
        "ArgList ParamList": delimitedIndent({ closing: ")" }),
        "VariableDeclaration ExpressionStatement": continuedIndent(),
      }),
      foldNodeProp.add({
        "Block ContainerBody SwitchBody InitList ArgList ParamList": foldInside,
      }),
      styleTags({
        "if else switch while for break continue return": t.controlKeyword,
        "try catch orelse unreachable defer errdefer resume nosuspend": t.controlKeyword,
        "const var fn": t.definitionKeyword,
        "struct enum union opaque error test": t.definitionKeyword,
        "pub extern export inline noinline threadlocal comptime packed": t.modifier,
        "volatile allowzero noalias align callconv linksection addrspace": t.modifier,
        "asm anytype anyframe": t.keyword,
        "and or": t.logicOperator,

        PrimitiveType: t.standard(t.typeName),
        Boolean: t.bool,
        Null: t.null,
        Undefined: t.atom,
        Integer: t.integer,
        Float: t.float,
        String: t.string,
        MultilineString: t.special(t.string),
        Char: t.character,
        Escape: t.escape,

        LineComment: t.lineComment,
        "DocComment ContainerDocComment": t.docComment,

        Identifier: t.variableName,
        BuiltinName: t.standard(t.function(t.variableName)),
        "FunctionName/Identifier": t.function(t.definition(t.variableName)),
        "CallExpression/Identifier": t.function(t.variableName),
        [names("VariableDefinition")]: t.definition(t.variableName),
        [names("FieldDefinition")]: t.definition(t.propertyName),
        [names("FieldName")]: t.propertyName,
        [names("CallExpression/MemberExpression/FieldName")]: t.function(t.propertyName),
        [names("EnumLiteral/FieldName") + " " + names("ErrorValue/FieldName")]: t.atom,
        "Label/Identifier Label/PrimitiveType LabelName/Identifier LabelName/PrimitiveType": t.labelName,

        '+ - "*" "/" % ++ +% -% +| -| *% *| ||': t.arithmeticOperator,
        "<< >> <<| & ^ | ~": t.bitwiseOperator,
        "Payload/|": t.punctuation,
        '== "!=" < > <= >=': t.compareOperator,
        '"!"': t.logicOperator,
        '= += -= *= "/=" %= <<= >>= &= ^= |= *%= +%= -%= *|= +|= -|= <<|=': t.updateOperator,
        "=> -> .. ... .* .? ?": t.operator,
        "( )": t.paren,
        "[ ] [*": t.squareBracket,
        "{ }": t.brace,
        ". , ;": t.separator,
      }),
    ],
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", '"', "'"] },
    commentTokens: { line: "//" },
    indentOnInput: /^\s*[\}\]\)]$/,
  },
});

export function zig() {
  return new LanguageSupport(zigLanguage);
}
