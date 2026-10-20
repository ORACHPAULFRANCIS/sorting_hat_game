import { HOUSE_ORDER } from './data';
import type { AnswerMap, HouseKey, HouseScores } from './types';

export const createEmptyScores = (): HouseScores => ({
  Gryffindor: 0,
  Ravenclaw: 0,
  Hufflepuff: 0,
  Slytherin: 0,
});

export function scoreAnswers(answers: AnswerMap): HouseScores {
  const scores = createEmptyScores();

  const q1 = answers.q1;
  if (q1 === 1) {
    scores.Gryffindor += 1;
    scores.Ravenclaw += 1;
  } else if (q1 === 2) {
    scores.Hufflepuff += 1;
    scores.Slytherin += 1;
  }

  const q2 = answers.q2;
  if (q2 === 1) {
    scores.Hufflepuff += 2;
  } else if (q2 === 2) {
    scores.Slytherin += 2;
  } else if (q2 === 3) {
    scores.Ravenclaw += 2;
  } else if (q2 === 4) {
    scores.Gryffindor += 2;
  }

  const q3 = answers.q3;
  if (q3 === 1) {
    scores.Slytherin += 4;
  } else if (q3 === 2) {
    scores.Hufflepuff += 4;
  } else if (q3 === 3) {
    scores.Ravenclaw += 4;
  } else if (q3 === 4) {
    scores.Gryffindor += 4;
  }

  return scores;
}

export function assignHouse(answers: AnswerMap): HouseKey {
  const scores = scoreAnswers(answers);
  let winner: HouseKey = HOUSE_ORDER[0];
  let topScore = Number.NEGATIVE_INFINITY;

  for (const house of HOUSE_ORDER) {
    if (scores[house] > topScore) {
      topScore = scores[house];
      winner = house;
    }
  }

  return winner;
}

export function getHouseResultText(house: HouseKey): string {
  return `The Sorting Hat has sorted you into ${house}!`;
}
