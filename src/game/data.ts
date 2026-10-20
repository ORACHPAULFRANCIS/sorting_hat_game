import type { HouseKey, QuizQuestion } from './types';

export const HOUSE_ORDER: HouseKey[] = ['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin'];

export const HOUSE_DETAILS: Record<HouseKey, { emoji: string; description: string; accent: string; glow: string }> = {
  Gryffindor: {
    emoji: '🦁',
    description: 'Bold, courageous, and driven by daring choices.',
    accent: 'from-red-500 to-amber-400',
    glow: 'shadow-red-500/25',
  },
  Ravenclaw: {
    emoji: '🦅',
    description: 'Curious, analytical, and guided by wisdom and wit.',
    accent: 'from-sky-500 to-indigo-400',
    glow: 'shadow-sky-500/25',
  },
  Hufflepuff: {
    emoji: '🦡',
    description: 'Loyal, patient, and true to the values of fairness and kindness.',
    accent: 'from-yellow-400 to-orange-400',
    glow: 'shadow-yellow-500/25',
  },
  Slytherin: {
    emoji: '🐍',
    description: 'Ambitious, strategic, and unafraid to pursue greatness.',
    accent: 'from-emerald-500 to-lime-400',
    glow: 'shadow-emerald-500/25',
  },
};

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'Do you like Dawn or Dusk?',
    options: [
      { value: 1, label: 'Dawn', note: 'Your answer leans toward brightness and bold beginnings.' },
      { value: 2, label: 'Dusk', note: 'Your answer points toward steadiness and quiet strength.' },
    ],
  },
  {
    id: 'q2',
    prompt: "When I'm dead, I want people to remember me as:",
    options: [
      { value: 1, label: 'The Good', note: 'A gentle, loyal legacy.' },
      { value: 2, label: 'The Great', note: 'A powerful and unforgettable presence.' },
      { value: 3, label: 'The Wise', note: 'A thoughtful and learned legacy.' },
      { value: 4, label: 'The Bold', note: 'A fearless and daring legacy.' },
    ],
  },
  {
    id: 'q3',
    prompt: 'Which kind of instrument most pleases your ear?',
    options: [
      { value: 1, label: 'Violin', note: 'Elegant and refined.' },
      { value: 2, label: 'Trumpet', note: 'Bright and confident.' },
      { value: 3, label: 'Piano', note: 'Balanced and thoughtful.' },
      { value: 4, label: 'Drum', note: 'Bold and driving.' },
    ],
  },
];
