"use strict"

const stdin = process.stdin;

stdin.setEncoding('utf8');

let grid = [];
let brightness = [];
const re = /(\D*)(\d+),(\d+) through (\d+),(\d+)/;

stdin.on('data', function(data) {
  if (!data.startsWith('t')) {
    let total_lights = 0;
    let total_brightness = 0;
    for (let row in brightness) {
      for (let col in brightness[row]) {
        if (grid[row][col]) total_lights += 1;
        total_brightness += brightness[row][col] || 0;
      }
    }
    console.log(`Part1: ${total_lights}, Part2 ${total_brightness}`);
    process.exit();
  }

  var [_, command, start_x, start_y, stop_x, stop_y] = re.exec(data).map(x => parseInt(x) || x);
  for (let x = start_x; x <= stop_x; x++) {
    if (grid[x] === undefined) {
      grid[x] = [];
      brightness[x] = [];
    }
    // arr.fill only fills up to arr.length:
    grid[x].length = Math.max(grid[x].length, stop_y + 1);
    switch (command) {
      case "turn off ":
        grid[x].fill(undefined, start_y, stop_y + 1);
        for (let y = start_y; y <= stop_y; y++)
          brightness[x][y] = Math.max(0, brightness[x][y] - 1);
        break;
      case "turn on ":
        grid[x].fill(true, start_y, stop_y + 1);
        for (let y = start_y; y <= stop_y; y++)
          brightness[x][y] = brightness[x][y] + 1 || 1;
        break;
      case "toggle ":
        for (let y = start_y; y <= stop_y; y++) {
          grid[x][y] = !grid[x][y];
          brightness[x][y] = brightness[x][y] + 2 || 2;
        }
        break;
    }
  }
});

console.log("Paste input, end with enter.");
