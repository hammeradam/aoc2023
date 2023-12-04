import { readFileSync } from 'fs';

const RED_MAX = 12;
const GREEN_MAX = 13;
const BLUE_MAX = 14;

const file = readFileSync('./2/input.txt').toString();
const games = file.split('\n');
let sum = 0;

for (let game of games) {
  const id = parseInt(game.split(':')[0].substring(5));

  const rounds = game
    .split(':')[1]
    .split(';')
    .map((draw) => draw.split(',').map((i) => i.trim().split(' ')));

  let possible = true;
  for (let round of rounds) {
    const counts = {
      red: parseInt(round.find((draw) => draw[1] === 'red')?.[0] ?? '0'),
      green: parseInt(round.find((draw) => draw[1] === 'green')?.[0] ?? '0'),
      blue: parseInt(round.find((draw) => draw[1] === 'blue')?.[0] ?? '0'),
    };

    if (
      counts.red > RED_MAX ||
      counts.green > GREEN_MAX ||
      counts.blue > BLUE_MAX
    ) {
      possible = false;
    }
  }

  if (possible) {
    sum += id;
  }
}

console.log(sum);
