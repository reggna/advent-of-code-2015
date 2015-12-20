"use strict"

const stdin = process.stdin;

stdin.setEncoding('utf8');

// Returns a permuted array with a given length.
// Example, given a length of 1, returns:
// [ [ 1, 0 ], [ 0, 1 ] ]
// and given a length of 2 it returns:
// [ [ 2, 1, 0 ], [ 1, 2, 0 ], [ 1, 0, 2 ],
//   [ 2, 0, 1 ], [ 0, 2, 1 ], [ 0, 1, 2 ] ]
// &c.
function create_permute_array(length) {
  if (length <= 0) return [[0]];
  let ret = [];
  for (let i of create_permute_array(length-1)) {
    for (let j = 0; j <= i.length; j++) {
      let c = i.slice(); // create a copy of i
      c.splice(j, 0, length); // add current number at index j
      ret.push(c);
    }
  }
  return ret;
}

let paths = [];
let count = 0;
let places = {};

function getPlaceIndex(place) {
  if (places[place] !== undefined)
    return places[place];
  return places[place] = count++;
}

function addPath(p1, p2, distance) {
  if (paths[p1] === undefined)
    paths[p1] = [];
  paths[p1][p2] = distance;
}

stdin.on('data', function(data) {
  if (data === '\n') {
    let possible_routes = create_permute_array(count-1).map(v => v.reduce(function(last, c, i) {
        if (i === 0) return 0;
        return last + paths[v[i-1]][c];
    }, 0))
    let min_route = Math.min(...possible_routes);
    let max_route = Math.max(...possible_routes);
    console.log(`Part 1: ${min_route}, Part 2: ${max_route}`);
    process.exit();
  }
  data = data.slice(0, -1).split(" ");
  let p1 = getPlaceIndex(data[0]);
  let p2 = getPlaceIndex(data[2]);
  let distance = ~~data[4];
  addPath(p1, p2, distance);
  addPath(p2, p1, distance);
});

console.log("Paste input, end with enter.");
