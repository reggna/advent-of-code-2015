"use strict"

const stdin = process.stdin;

stdin.setEncoding('utf8');

const re = /\D*(\d+)\D*(\d+)\D*(\d+)/;
const time = 2503;
let stats = [];

stdin.on('data', function(data) {
  if (data === '\n') {
    let part1 = Math.max(...stats.map(function(v) {
      let distance = 0;
      let t = time;
      while (t > 0) {
        distance += v[1] * ((t > v[2]) ? v[2] : t)
        t -= v[2]+v[3];
      }
      return distance;
    }));

    let deers = stats.map(a => a.slice());
    deers.map(a => a[0] = {distance: 0, points: 0});
    for (let i = 0; i < time; i++) {
      let leader_score = 0;
      for (let deer_index in deers) {
        let deer = deers[deer_index];
        if (deer[2] > 0) {
          deer[2] -= 1;
          deer[0].distance += deer[1];
        } else if (deer[3] > 0) {
          deer[3] -= 1;
        } else {
          deer[2] = stats[deer_index][2]-1;
          deer[3] = stats[deer_index][3];
          deer[0].distance += deer[1];
        }
        leader_score = leader_score > deer[0].distance ? leader_score : deer[0].distance;
      }
      for (let deer of deers)
        deer[0].points += deer[0].distance === leader_score ? 1 : 0;
    }
    let part2 = Math.max(...deers.map(a => a[0].points));
    console.log(`Part 1: ${part1}, Part 2: ${part2}`);
    process.exit();
  }
  stats.push(re.exec(data).map(v => ~~v));

});

console.log("Paste input, end with enter.");
