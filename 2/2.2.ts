import { readFileSync } from 'fs';

const file = readFileSync('1/input.txt').toString();

const map = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

console.log(
  file
    .split('\n')
    .map((line) =>
      Array.from(line
        .matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)).map(x => x[1])
        ?.map((item) => map[item] ?? item)
    )
    .map((arr) => Number.parseInt(arr!.at(0)?.toString()! + arr!.at(arr?.length - 1)?.toString()!))
    .reduce((acc, i) => acc + i, 0)
);
