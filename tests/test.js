// Run: node tests/test.js
const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const m = html.match(/\/\/ <<CORE([\s\S]*?)\/\/ CORE>>/);
if (!m) { console.error('CORE block not found'); process.exit(1); }
const api = new Function(m[1] + '; return {transformCase,transformLines,countStats,findReplace,toSlug,toTitle,toCamel,toSnake,toKebab,dedupeLines};')();
let fails = 0;
const eq = (n, got, want) => { if (JSON.stringify(got) !== JSON.stringify(want)) {
  fails++; console.log(`FAIL ${n}\n  got  ${JSON.stringify(got)}\n  want ${JSON.stringify(want)}`); } };

eq('upper', api.transformCase('aBc', 'upper'), 'ABC');
eq('lower', api.transformCase('aBc', 'lower'), 'abc');
eq('title', api.toTitle('the quick brown fox'), 'The Quick Brown Fox');
eq('title keeps small words', api.toTitle('a tale of two cities'), 'A Tale of Two Cities');
eq('sentence', api.transformCase('hello there. how are you', 'sentence'), 'Hello there. How are you');
eq('camel', api.toCamel('hello big world'), 'helloBigWorld');
eq('camel from snake', api.toCamel('hello_big_world'), 'helloBigWorld');
eq('snake', api.toSnake('Hello Big World'), 'hello_big_world');
eq('kebab', api.toKebab('Hello Big World'), 'hello-big-world');
eq('slug strips accents', api.toSlug('Crème Brûlée & Café'), 'creme-brulee-cafe');
eq('slug collapses', api.toSlug('  a -- b  '), 'a-b');
eq('sort lines', api.transformLines('b\na\nc', 'sort'), 'a\nb\nc');
eq('sort desc', api.transformLines('a\nc\nb', 'sort-desc'), 'c\nb\na');
eq('sort by length', api.transformLines('ccc\na\nbb', 'sort-len'), 'a\nbb\nccc');
eq('dedupe keeps first', api.dedupeLines('a\nb\na\nc'), 'a\nb\nc');
eq('dedupe ignores spaces', api.dedupeLines('a\n a \nb'), 'a\nb');
eq('trim', api.transformLines('  a  \n b', 'trim'), 'a\nb');
eq('drop blank', api.transformLines('a\n\nb\n  \nc', 'blank'), 'a\nb\nc');
eq('number lines', api.transformLines('a\nb', 'number'), '1. a\n2. b');
eq('reverse', api.transformLines('a\nb', 'reverse'), 'b\na');
const stats = api.countStats('one two three\nfour');
eq('char count', stats.characters, 18);
eq('word count', stats.words, 4);
eq('line count', stats.lines, 2);
eq('reading minutes floor 1', api.countStats('one').minutes, 1);
eq('empty stats', api.countStats('').words, 0);
eq('replace plain', api.findReplace('a a a', 'a', 'b', false).count, 3);
eq('replace plain value', api.findReplace('a a a', 'a', 'b', false).value, 'b b b');
eq('replace regex', api.findReplace('a1 b2', '\\d', '#', true).value, 'a# b#');
eq('replace bad regex', api.findReplace('x', '([', 'y', true).ok, false);
eq('replace empty find', api.findReplace('abc', '', 'x', false).value, 'abc');

console.log(fails ? `\n${fails} FAILURE(S)` : 'ALL TEXTKIT TESTS PASSED');
process.exit(fails ? 1 : 0);
