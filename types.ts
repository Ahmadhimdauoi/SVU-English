
export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export type TestState = 'WELCOME' | 'QUIZ' | 'RESULTS';

export interface TestResult {
  score: number;
  total: number;
  percentage: number;
  grade: string;
  userAnswers: Record<number, string>;
}
