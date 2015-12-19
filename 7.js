"use strict"

const stdin = process.stdin;

stdin.setEncoding('utf8');

let wires = {};
let cache = [];
for (let i = 0; i <= 65535; i++) cache.push(i);

function updateCache(target) {
  return cache[target] = getData(target) & 0x0000ffff; // avoid 16 -> 32 bit overflow
}
function getData(target) {
  if (cache[target] !== undefined) return cache[target];
  let command = wires[target].split(' ').map(x => parseInt(x) || x);
  switch (command.length) {
    case 1:
      return updateCache(command[0]);
    case 2: // NOT
      return ~updateCache(command[1]);
    case 3:
      switch (command[1]) {
        case "AND":
          return updateCache(command[0]) & updateCache(command[2]);
        case "OR":
          return updateCache(command[0]) | updateCache(command[2]);
        case "LSHIFT":
          return updateCache(command[0]) << updateCache(command[2]);
        case "RSHIFT":
          return updateCache(command[0]) >> updateCache(command[2]);
      }
  }
}

stdin.on("data", function(data){
  if (data === '\n') {
    let part1 = updateCache('a');

    cache = [];
    for (let i = 0; i <= 65535; i++) cache.push(i);
    cache['b'] = part1;
    let part2 = updateCache('a');

    console.log(`Part 1: ${part1}, Part 2: ${part2}`);
    process.exit();
  }

  // remove new line char:
  data = data.slice(0, -1);

  var [command, target_wire] = data.split(" -> ");
  wires[target_wire] = command;
});

console.log("Paste input, end with enter.");
