import { readFileSync } from 'fs';

const file = readFileSync('./2/input.txt').toString();
const games = file.split('\n');
let sum = 0;

for (let game of games) {
  const rounds = game
    .split(':')[1]
    .split(';')
    .map((draw) => draw.split(',').map((i) => i.trim().split(' ')));

  const counts = {
    red: 0,
    green: 0,
    blue: 0,
  };
  let power = 0;

  for (let round of rounds) {
    const red = parseInt(round.find((draw) => draw[1] === 'red')?.[0] ?? '0');
    const green = parseInt(round.find((draw) => draw[1] === 'green')?.[0] ?? '0');
    const blue = parseInt(round.find((draw) => draw[1] === 'blue')?.[0] ?? '0');

    counts.red = red > counts.red ? red : counts.red;
    counts.green = green > counts.green ? green : counts.green;
    counts.blue = blue > counts.blue ? blue : counts.blue;

    power = counts.red * counts.blue * counts.green;
  }

  sum += power;
}

console.log(sum);
