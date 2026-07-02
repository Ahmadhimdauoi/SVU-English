
export interface Question {
  id: number;
  difficulty_label: string; // "Elementary", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Advanced"
  question: string;
  options: string[];
  answer: string;
  explanation?: string; // Optional explanation in Arabic
}

export interface TestInfo {
  id: string;
  title: string;
  questions: Question[];
}

export interface LevelInfo {
  id: number;
  title: string;
  desc: string;
  tests: TestInfo[];
}

export type TestState = 'WELCOME' | 'TEST_SELECTION' | 'QUIZ' | 'RESULTS';

export interface TestResult {
  score: number;
  total: number;
  percentage: number;
  grade: string;
  userAnswers: Record<number, string>;
}
