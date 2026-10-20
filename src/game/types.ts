export type HouseKey = 'Gryffindor' | 'Ravenclaw' | 'Hufflepuff' | 'Slytherin';

export type HouseScores = Record<HouseKey, number>;

export type QuestionId = 'q1' | 'q2' | 'q3';

export interface QuizOption {
  value: number;
  label: string;
  note?: string;
}

export interface QuizQuestion {
  id: QuestionId;
  prompt: string;
  options: QuizOption[];
}

export interface AnswerMap {
  q1?: number;
  q2?: number;
  q3?: number;
}
