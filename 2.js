"use strict"

const stdin = process.stdin;

stdin.setEncoding('utf8');

let paper_size = 0;
let ribbon_length = 0;
stdin.on('data', function(data) {
  if (data === '\n') {
    console.log(`Part 1: ${paper_size}, Part 2: ${ribbon_length}`);
    process.exit();
  }
  var [x, y, z] = data.split('x').map(x => ~~x);
  let max = Math.max(x,y,z);
  paper_size += 2 * (x*y + x*z + y*z) + x*y*z/max;
  ribbon_length += 2 * (x+y+z-max) + x*y*z;
});

console.log("Paste input, end with enter.");
