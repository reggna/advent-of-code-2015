"use strict"

const stdin = process.stdin;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");

let part1 = 0;
let part2 = 0;
let last_char = '';
let line = "";
stdin.on('data', function(data) {
  for (const k of data) {
    if (last_char !== '\\' && (k === '\\' || k === '"')) part1 += 1;
    else if (last_char === '\\' && k == 'x') part1 += 2;
    if (k === '\r') {
      if (last_char === '\r') {
        console.log(`Part 1: ${part1}, Part 2: ${part2}`);
        process.exit();
      } else {
        let encoded = line.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
        part2 += encoded.length - line.length + 2;
        line = "";
      }
    }
    if (last_char === '\\' && k === '\\') last_char = ''; // fix "//"
    else last_char = k;
    line += k;
  }
});

console.log("Paste input, end with enter.");
