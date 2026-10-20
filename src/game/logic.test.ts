import { describe, expect, it } from 'vitest';
import { assignHouse, scoreAnswers } from './logic';

describe('sorting hat logic', () => {
  it('scores the original questions according to the Flask rules', () => {
    expect(scoreAnswers({ q1: 1, q2: 4, q3: 4 })).toEqual({
      Gryffindor: 7,
      Ravenclaw: 1,
      Hufflepuff: 0,
      Slytherin: 0,
    });

    expect(scoreAnswers({ q1: 2, q2: 1, q3: 2 })).toEqual({
      Gryffindor: 0,
      Ravenclaw: 0,
      Hufflepuff: 7,
      Slytherin: 1,
    });

    expect(scoreAnswers({ q1: 1, q2: 3, q3: 3 })).toEqual({
      Gryffindor: 1,
      Ravenclaw: 7,
      Hufflepuff: 0,
      Slytherin: 0,
    });

    expect(scoreAnswers({ q1: 2, q2: 2, q3: 1 })).toEqual({
      Gryffindor: 0,
      Ravenclaw: 0,
      Hufflepuff: 1,
      Slytherin: 7,
    });
  });

  it('keeps the original tie-breaking behaviour by preferring the first house in the original order', () => {
    expect(assignHouse({ q1: 999, q2: 999, q3: 999 })).toBe('Gryffindor');
    expect(assignHouse({})).toBe('Gryffindor');
  });

  it('handles invalid input safely', () => {
    expect(scoreAnswers({ q1: 0, q2: 9, q3: -1 })).toEqual({
      Gryffindor: 0,
      Ravenclaw: 0,
      Hufflepuff: 0,
      Slytherin: 0,
    });
  });
});
