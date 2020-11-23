import { calcTime, getSpentSec, splicedCount, storeSpentSec } from '../src/index';

const wordList = [
  {
    "second": 10,
    "text": "hello"
  },
  {
    "second": 10,
    "text": "world"
  },
  {
    "second": 8,
    "text": "this"
  },
  {
    "second": 3,
    "text": "is"
  },
  {
    "second": 15,
    "text": "kakaopay"
  },
  {
    "second": 5,
    "text": "we"
  },
  {
    "second": 5,
    "text": "are"
  },
  {
    "second": 15,
    "text": "kakaopay"
  },
  {
    "second": 15,
    "text": "frontend"
  },
  {
    "second": 20,
    "text": "developers"
  },
  {
    "second": 15,
    "text": "join"
  },
  {
    "second": 10,
    "text": "us"
  }
];

describe("Calculating Average Time", () => {
  test('Calculating Average Time', () => {
    const spentSecArr = [2, 3, 4, 10, 2, 3, 12];
    const result = calcTime(spentSecArr);
    expect(result).toBe(3);
  });
  test('splicedCount', ()=> {
    const mutatedLength = 3;
    const result = splicedCount(wordList.length, mutatedLength);
    expect(result).toBe(9);
  });
  test('getSpentSec', ()=> {
    const idx = 1;
    const leftSec = 4;
    const result = getSpentSec(wordList, idx, leftSec);
    expect(result).toBe(6);
  });
  test('storeSpentSec', ()=> {
    const spentSec = 6;
    const result = storeSpentSec(spentSec);
    expect(result).toBe([6]);
  });
})