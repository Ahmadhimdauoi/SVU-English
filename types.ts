
export interface Question {
  id: number;
  difficulty_label: string; // "Elementary", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Advanced"
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
