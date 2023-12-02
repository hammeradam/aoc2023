import { readFileSync } from 'fs';

const file = readFileSync('./1/input.txt').toString();

console.log(
  file
    .split('\n')
    .map((line) =>
      line
        .split('')
        .map((letter) => Number.parseInt(letter, 10))
        .filter(Number.isInteger)
    )
    .map((arr) => Number.parseInt(arr.at(0)?.toString()! + arr.at(-1)?.toString()!))
    .reduce((acc, i) => acc + i, 0)
);
