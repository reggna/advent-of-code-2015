"use strict"

const stdin = process.stdin;

stdin.setEncoding('utf8');

let ingredients = [];

function getAllCombinations(starting_with, spoons_left) {
  if (starting_with === ingredients.length-1)
    return [ingredients[starting_with].map(a => a*spoons_left)];

  let ret = [];
  Array.from({length: spoons_left}).map((_, i) => ret = ret.concat(getAllCombinations(starting_with + 1, spoons_left - i).map(a => a.map((v, k) => v + (ingredients[starting_with][k]) * i))));
  return ret;
}

stdin.on('data', function(data) {
  if (data === '\n') {
    let part1 = getAllCombinations(0, 100).map(a => a.reduce((l, c) => c < 0 ? 0 : l * c)).reduce((l, c) => l > c ? l : c, 0);
    console.log(`Part 1: ${part1}`);
    process.exit();
  }
  // Parse data...
  ingredients.push(data.split(/[^0-9-]+/g).map(v => ~~v).slice(1, 5));
});

console.log("Paste input, end with enter.");
