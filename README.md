# TextKit

**Case, counts, sorting, deduplication, slugs and regex replace — in the page.**

**[Live: https://quantumcoder-14.github.io/textkit/](https://quantumcoder-14.github.io/textkit/)** — nothing to install.

One self-contained `index.html`. No build step, no framework, no dependencies to install.

## What it does

**Case:** UPPER, lower, Title Case (small words like *of* and *the* stay lowercase), Sentence
case, camelCase, snake_case, kebab-case, and URL slugs that strip accents — `Crème Brûlée`
becomes `creme-brulee`.

**Lines:** sort A-Z, Z-A, by length, reverse, remove duplicates (ignoring surrounding spaces),
trim, drop empty lines, number, shuffle.

**Find and replace:** plain text or a regular expression, with a count of what changed.

**Live counts:** characters, words, lines, and an estimated reading time at 200 words per
minute.

## The design decision that matters

**Nothing overwrites your text.** Results land in the right-hand pane; `Use result as input`
moves them over only when you press it. Tools that transform in place are how people lose a
paragraph they meant to keep.

## Local only

No server, no cookies, no analytics. The text stays in the page's memory and disappears when
you close the tab. Save the page and it works offline.

## Tests

```bash
node tests/test.js     # 32 assertions
```

The test extracts the core functions from the shipped `index.html`, so it exercises the code
that actually runs rather than a copy.

## Run it

Open `index.html`, or host it anywhere static. To publish on GitHub Pages: **Settings →
Pages → Deploy from a branch → `main` → `/ (root)`**.

## Licence

MIT with Commons Clause. Copyright (c) 2026 Siddhant Neekhra. See [LICENSE.md](LICENSE.md).
