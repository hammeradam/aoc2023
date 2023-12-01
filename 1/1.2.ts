import { readFileSync } from 'fs';

const file = readFileSync('1/1.txt').toString();

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
      line
        .match(/(one|two|three|four|five|six|seven|eight|nine|\d)/g)
        ?.map((item) => map[item] ?? item)
    )
    .map((arr) => Number.parseInt(arr!.at(0)?.toString()! + arr!.at(-1)?.toString()!))
    .splice(990, 10)
    // .reduce((acc, i) => acc + i, 0)
);

// const fs = require('fs');

// function getCalibrationSum(filename) {
//   const fileContent = fs.readFileSync(filename, 'utf-8').split('\n');

//   const digitMap = {
//     one: '1',
//     two: '2',
//     three: '3',
//     four: '4',
//     five: '5',
//     six: '6',
//     seven: '7',
//     eight: '8',
//     nine: '9',
//   };

//   function getMappedDigit(digit) {
//     return digitMap[digit.toLowerCase()] || digit;
//   }

//   function getCalibrationValue(line) {
//     const digits = line.match(/(?:one|two|three|four|five|six|seven|eight|nine|\d)/gi);
//     if (digits) {
//       const firstDigit = getMappedDigit(digits[0]);
//       const lastDigit = getMappedDigit(digits[digits.length - 1]);
//       return parseInt(`${firstDigit}${lastDigit}`, 10);
//     }
//     return 0;
//   }

//   const sum = fileContent.reduce((acc, line) => acc + getCalibrationValue(line), 0);
//   return sum;
// }

// const filename = '1/1.txt'; // Change this to the actual path of your input file
// const result = getCalibrationSum(filename);
// console.log(result);