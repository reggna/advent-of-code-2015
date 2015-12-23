"use strict"

const stdin = process.stdin;

stdin.setEncoding('utf8');

let containers = [];

function getCombination(start, sum) {
  let ret = [];
  for (let i = start; i < containers.length && containers[i] <= sum; i++) {
    for (let comb of getCombination(i + 1, sum - containers[i])) {
      comb.push(containers[i]);
      ret.push(comb);
    }
    if (containers[i] === sum) ret.push([containers[i]]);
  }
  return ret;
}

stdin.on('data', function(data) {
  if (data === '\n') {
    containers.sort((a, b) => a - b);
    let comb = getCombination(0, 150);
    let lengths = comb.map(a => a.length);
    let min = Math.min(...lengths);
    let part2 = lengths.reduce((c, v) => c += (v === min ? 1 : 0), 0);
    console.log(`Part 1: ${comb.length}, Part 2: ${part2}`);
    process.exit();
  }
  containers.push(~~data.slice(0, -1));
});

console.log("Paste input, end with enter.");
