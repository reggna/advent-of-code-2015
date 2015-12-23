"use strict"

const stdin = process.stdin;

stdin.setEncoding('utf8');

let gift_aunt = {
    'children': 3,
    'cats': 7,
    'samoyeds': 2,
    'pomeranians': 3,
    'akitas': 0,
    'vizslas': 0,
    'goldfish': 5,
    'trees': 3,
    'cars': 2,
    'perfumes': 1
};

function is_gift_aunt(pa) {
  for (let i in pa)
    if (pa[i] !== gift_aunt[i])
      return false;
  return true;
}

function is_real_gift_aunt(pa) {
  for (let i in pa) {
    if (i === 'cats' || i === 'trees') {
      if (pa[i] <= gift_aunt[i]) return false;
    } else if (i === 'pomeranians' || i === 'goldfish') {
      if (pa[i] >= gift_aunt[i]) return false;
    } else if (pa[i] !== gift_aunt[i]) {
      return false;
    }
  }
  return true;
}


let part1 = '';
let part2 = '';
const re = /(\d+): ([^:]*): (\d+), ([^:]*): (\d+), ([^:]*): (\d+)/;
stdin.on('data', function(data) {
  if (data === '\n') {
    console.log(`Part 1: ${part1}, Part 2: ${part2}`);
    process.exit();
  }
  data = re.exec(data.slice(4, -1));
  let pa = { };
  pa[data[2]] = ~~data[3];
  pa[data[4]] = ~~data[5];
  pa[data[6]] = ~~data[7];
  if (is_gift_aunt(pa)) part1 = data[1];
  if (is_real_gift_aunt(pa)) part2 = data[1];
});

console.log("Paste input, end with enter.");
