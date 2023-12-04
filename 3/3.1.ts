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

const findParts = (line: string, i: number) => {
  const matches = Array.from(line.matchAll(/\d+/g));

  return matches.map((match) => ({
    lineIndex: i,
    value: match[0],
    index: match.index!,
  }));
}

const rows = readFileSync(INPUT_FILE_NAME).toString().split('\n');
const sum = rows
  .flatMap(findParts)
  .filter((match) => checkSides(match, rows))
  .reduce((acc, part) => (acc += Number(part.value)), 0);

console.log(sum);
