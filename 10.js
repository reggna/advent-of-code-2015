"use strict"

const stdin = process.stdin;

stdin.setEncoding('utf8');

function look_and_say(input) {
  let ret = [];
  for (let i = 0; i < input.length; i++) {
    let count;
    let c = input[i];
    for(count = 1; input[i+1] === c && i < input.length; count++, i++);
    ret.push(count);
    ret.push(~~c);
  }
  return ret;
}

stdin.on('data', function(data) {
  let part1 = data.slice(0, -1);
  for (let i = 0; i < 40; i++) {
    part1 = look_and_say(part1);
  }

  let part2 = part1;
  for (let i = 40; i < 50; i++) {
    part2 = look_and_say(part2);
  }

  console.log(`Part 1: ${part1.length}, Part 2: ${part2.length}`);
  process.exit();
});

console.log("Paste input, end with enter.");
