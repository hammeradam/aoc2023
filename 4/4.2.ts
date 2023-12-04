import { readFileSync } from 'fs';

const INPUT_FILE_NAME = './4/input.txt';

interface Card {
  id: number;
  playedNumbers: number[];
  winningNumbers: number[];
  copies: number;
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
    copies: 1,
  };
};

const getWinnedCount = ({ playedNumbers, winningNumbers }: Card) => {
  return playedNumbers.filter((number) => winningNumbers.includes(number))
    .length;
};

const processCard = (card: Card, i: number, array: Card[]) => {
  const winnedCount = getWinnedCount(card);

  for (let j = i + 1; j < i + winnedCount + 1; j++) {
    array[j].copies += array[i].copies;
  }

  return card;
}

const sumCards = (acc: number, card: Card) => acc + card.copies

const cards = readFileSync(INPUT_FILE_NAME)
  .toString()
  .split('\n')
  .map(rowToCard)
  .map(processCard)
  .reduce(sumCards, 0);

console.log(cards);
