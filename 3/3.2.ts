import { readFileSync } from 'fs';

const INPUT_FILE_NAME = './3/input.txt';

const checkSides = (
  {
    index,
    lineIndex,
    value,
  }: { lineIndex: number; value: string; index: number },
  rows: string[]
) => {
  const lineAbove = rows[lineIndex - 1];

  if (
    lineAbove &&
    lineAbove
      .substring(
        Math.max(index - 1, 0),
        Math.min(index + value.length + 1, lineAbove.length - 1)
      )
      .match(/[^0-9.]/g)
  ) {
    return true;
  }

  const lineBelow = rows[lineIndex + 1];
  if (
    lineBelow &&
    lineBelow
      .substring(
        Math.max(index - 1, 0),
        Math.min(index + value.length + 1, lineBelow.length - 1)
      )
      .match(/[^0-9.]/g)
  ) {
    return true;
  }

  if (
    rows[lineIndex].substring(index - 1, index).match(/[^0-9.]/) ||
    rows[lineIndex]
      .substring(index + value.length, index + value.length + 1)
      .match(/[^0-9.]/)
  ) {
    return true;
  }

  return false;
};

const findParts = (line: string, i: number) =>
  Array.from(line.matchAll(/\d+/g)).map((match) => ({
    lineIndex: i,
    value: match[0],
    index: match.index!,
  }));

interface Gear {
  lineIndex: number;
  index: number;
}

const findGears = (line: string, i: number): Gear[] =>
  Array.from(line.matchAll(/\*/g)).map((match) => ({
    lineIndex: i,
    index: match.index!,
  }));

const checkGears = (acc: number[][], gear: Gear) => {
  const partsAbove = parts
    .filter((part) => part.lineIndex === gear.lineIndex - 1)
    .filter((part) => gear.index >= part.index - 1 && gear.index <= part.index + part.value.length);

  const partsBelow = parts
    .filter((part) => part.lineIndex === gear.lineIndex + 1)
    .filter((part) => gear.index >= part.index - 1 && gear.index <= part.index + part.value.length);

  const partToLeft = parts
    .filter((part) => part.lineIndex === gear.lineIndex)
    .filter((part) => gear.index === part.index + part.value.length)[0];

  const partToRight = parts
    .filter((part) => part.lineIndex === gear.lineIndex)
    .filter((part) => gear.index + 1 === part.index)[0];

  const adjacentParts = [
    ...partsAbove,
    ...partsBelow,
    partToRight,
    partToLeft,
  ].filter(Boolean);

  if (adjacentParts.length === 2) {
    return [
      ...acc,
      [Number(adjacentParts[0].value), Number(adjacentParts[1].value)],
    ];
  }

  return acc;
};

const rows = readFileSync(INPUT_FILE_NAME).toString().split('\n');
const parts = rows
  .flatMap(findParts)
  .filter((match) => checkSides(match, rows));

const sum = rows
  .flatMap(findGears)
  .reduce(checkGears, [] as number[][])
  .reduce((acc, ratio) => acc + ratio[0] * ratio[1], 0);

console.log(sum);
