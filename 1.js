"use strict"

const stdin = process.stdin;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

let current_floor = 0;
let found_basement = false;
let basement_entry = 0;
stdin.on('data', function(data) {
  for (const k of data) {
    switch(k) {
      case '(':
        current_floor += 1;
        break;
      case ')':
        current_floor -=1;
        break;
      default:
        console.error("Unknown input: " + k);
      case '\r':
        console.log(`Part 1: ${current_floor}, Part 2: ${found_basement ? basement_entry : -1}`);
        process.exit();
    }
    if (!found_basement) {
      basement_entry += 1;
      if (current_floor < 0) {
        found_basement = true;
      }
    }
  }
});

console.log("Paste input, end with enter.");
