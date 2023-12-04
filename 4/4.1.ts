import { readFileSync } from 'fs';

const INPUT_FILE_NAME = './4/input.txt';

interface Card {
  id: number;
  playedNumbers: number[];
  winningNumbers: number[];
}

const rowToCard = (card: string): Card => {
  const id = Number(card.split(':')[0].substring(5));
  const numbers = card
    .split(':')[1]
    .split('|')
    .map((sides) =>
      sides
        .trim()
        .split(' ')
        .filter((number) => number.length)
        .map(Number)
    );

  return {
    id,
    playedNumbers: numbers[0],
    winningNumbers: numbers[1],
  };
};

const sumPoints = (acc: number, { playedNumbers, winningNumbers }: Card) => {
  const winnedNumbers = playedNumbers.filter(number => winningNumbers.includes(number));

  if (!winnedNumbers.length) {
    return acc;
  }
  return acc + 2 ** (winnedNumbers.length - 1);
}

const points = readFileSync(INPUT_FILE_NAME)
  .toString()
  .split('\n')
  .map(rowToCard)
  .reduce(sumPoints, 0);

console.log(points);
