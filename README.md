# Zig language support for CodeMirror

![NPM Version](https://img.shields.io/npm/v/@exercism/codemirror-lang-zig)

This repo contains the grammar for the [Zig language](https://ziglang.org/).
The grammar is based on the official PEG grammar in the Zig source (`doc/langref/grammar.peg`, Zig 0.17).

⚠️ To ensure that the package can be integrated on the Exercism website, don't change the packages' versions:

```json
"@codemirror/language": "^6.10.1",
"@lezer/highlight": "^1.2.0",
"@lezer/lr": "^1.4.0"
```

## Install

- NPM: `npm install @exercism/codemirror-lang-zig`
- Yarn: `yarn add @exercism/codemirror-lang-zig`
- Bun: `bun add @exercism/codemirror-lang-zig`

## Prerequisites

- [Bun](https://bun.sh/)

## Resources

- [CodeMirror](https://codemirror.net/docs/)
- [Lezer](https://lezer.codemirror.net/docs/guide/)
  - [Writing a Grammar](https://lezer.codemirror.net/docs/guide/#writing-a-grammar)
  - [Examples](https://lezer.codemirror.net/examples/)
  - [Existing grammar files](https://github.com/search?q=org%3Alezer-parser+path%3A%2F.grammar%24%2F&type=code)

## Structure

The repo's source files are defined in [TypeScript](https://www.typescriptlang.org/).

The repo is structured as follows:

```text
.
├── src
│   ├── index.ts (the main plugin)
│   ├── primitives.ts (primitive type and value names, such as u8 and null)
│   ├── tokens.ts (the external specializer for primitive names)
│   ├── syntax.grammar (the Lezer grammar)
│   ├── syntax.grammar.d.ts (the grammar typings)
│   └── syntax.grammar.terms.d.ts (the grammar term typings)
├── test
│   ├── cases (test cases)
│   │   └ *.txt (test case)
│   ├── grammar.test.ts (test file)
│   └── parser.ts (builds the parser from the grammar for the tests)
├── index.html (dev server file)
├── rollup.config.js (bundling config)
├── tsconfig.json (typescript config)
└── vite.config.js (vite dev server config)
```

## Setup

Run `bun install` to install all dependencies.

## Developing

To help with development, run `bun run dev`.
This will start a [Vite](https://vite.dev/) dev server (usually at http://localhost:5173/) that renders the `index.html` file.
The `#editor` element gets populated with some sample source code of your choosing and then it will get transformed by the grammar defined in `src/syntax.grammar`.
Any changes to the grammar will auto-refresh the dev server's rendered contents.

## Testing

The `test/cases` directory contains the tests files.
Run `bun test` to run these tests.

Note: test (case) files should be relatively small and focus on a single aspect of a grammar.

## Publishing

Run `bun publish` to publish the plugin to NPM.
