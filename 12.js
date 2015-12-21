"use strict"

const stdin = process.stdin;

stdin.setEncoding('utf8');

function sum(data) {
  if ("number" === typeof data) return data;
  if ("string" === typeof data) return ~~data;
  if (!(data instanceof Array))
    for (let key in data) if (key === "red" || data[key] === "red")
      return 0;
  let ret = 0;
  for (let key in data) ret += sum(data[key]);
  return ret;
}

stdin.on('data', function(data) {
  const re = /([\d|-]+)/g
  let part1 = 0;
  let r;
  while ((r = re.exec(data)) !== null) part1 += ~~r[0];

  let part2 = sum(JSON.parse(data));
  console.log(`Part 1: ${part1}, Part 2: ${part2}`);
  process.exit();
});

console.log("Paste input, end with enter.");
