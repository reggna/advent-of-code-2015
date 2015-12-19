"use strict"

const stdin = process.stdin;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

class Santa {
  constructor(visited) {
    this.x = 0;
    this.y = 0;
    this.visit(visited);
  }

  visit(visited) {
    if (visited[this.x] === undefined)
      visited[this.x] = []
    if(!(this.y in visited[this.x])) {
      // visiting a new house
      visited[this.x][this.y] = null;
      visited.count += 1;
    }
  }

  move(input, visited) {
    switch(input) {
      case '<':
        this.x -= 1;
        break;
      case '>':
        this.x += 1;
        break;
      case '^':
        this.y += 1;
        break;
      case 'v':
        this.y -= 1;
        break;
      default:
        console.log("Unknown input: " + input);
    }
    this.visit(visited);
  }
}

let visited_year1 = { count: 0 };
let visited_year2 = { count: 0 };
let santa_year1 = new Santa(visited_year1);
let santa_year2 = new Santa(visited_year2);
let robot = new Santa(visited_year2);
let move_robot = false;

stdin.on('data', function(data) {
  for (const k of data) {
    if (k === '\r') {
      console.log(`Part1: ${visited_year1.count}, Part2: ${visited_year2.count}`);
      process.exit();
    }

    santa_year1.move(k, visited_year1);

    let santa_or_robot = move_robot ? robot : santa_year2;
    santa_or_robot.move(k, visited_year2);
    move_robot = !move_robot;
  }
});

console.log("Paste input, end with enter.");
